import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useRef, useState, useEffect } from "react";
import * as Haptics from "expo-haptics";

export default function VideoConferenceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const roomName = (params.room as string) || `study-${Date.now()}`;
  const userName = (params.userName as string) || "Estudante";

  // HTML com integração Jitsi Meet usando biblioteca oficial
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>Jitsi Meet - Videoconferência</title>
      <script src="https://meet.jit.si/external_api.js"></script>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          width: 100%;
          height: 100%;
          background: #000;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          overflow: hidden;
        }
        #jitsi-container {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="jitsi-container"></div>
      <script>
        let api = null;
        let loadTimeout = null;
        let fallbackTimeout = null;

        function initJitsi() {
          try {
            if (typeof JitsiMeetExternalAPI === 'undefined') {
              console.error('JitsiMeetExternalAPI não está disponível');
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "error",
                message: "Biblioteca Jitsi não carregada"
              }));
              return;
            }

            const domain = "meet.jit.si";
            const options = {
              roomName: "${roomName}",
              width: "100%",
              height: "100%",
              parentNode: document.querySelector("#jitsi-container"),
              userInfo: {
                displayName: "${userName}",
              },
              configOverrides: {
                startAudioOnly: false,
                startWithAudioMuted: false,
                startWithVideoMuted: false,
                resolution: 720,
                constraints: {
                  video: {
                    height: { ideal: 720, max: 1080, min: 360 },
                    width: { ideal: 1280, max: 1920, min: 640 }
                  }
                },
                enableWelcomePage: false,
                prejoinPageEnabled: false,
                disableDeepLinking: true,
                disableThirdPartyRequests: false,
                analytics: { disabled: true },
                p2p: { enabled: true },
                enableLayerSuspension: true,
                enableOpusRed: true,
                enableNoisyMicDetection: true,
              },
              interfaceConfigOverrides: {
                TOOLBAR_ALWAYS_VISIBLE: false,
                SHOW_JITSI_WATERMARK: false,
                MOBILE_APP_PROMO: false,
                SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                SHOW_BRAND_WATERMARK: false,
                SHOW_POWERED_BY: false,
                HIDE_DEEP_LINKING_LOGO: true,
                SHOW_CHROME_EXTENSION_BANNER: false,
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
                HIDE_INVITE_MORE_HEADER: true,
                DISABLE_PRESENCE_STATUS: false,
                DISABLE_FOCUS_INDICATOR: false,
                TOOLBAR_BUTTONS: [
                  'microphone',
                  'camera',
                  'closedcaptions',
                  'desktop',
                  'fullscreen',
                  'fodeviceselection',
                  'hangup',
                  'chat',
                  'raisehand',
                  'videoquality',
                  'filmstrip',
                  'tileview',
                  'select-background',
                  'mute-everyone',
                  'security'
                ]
              }
            };

            api = new JitsiMeetExternalAPI(domain, options);

            // Event: Usuário entrou na conferência
            api.addEventListener("videoConferenceJoined", function(event) {
              console.log("✓ Conferência iniciada", event);
              clearTimeout(loadTimeout);
              clearTimeout(fallbackTimeout);
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "conferenceJoined",
                message: "Você entrou na conferência"
              }));
            });

            // Event: Conferência falhou
            api.addEventListener("videoConferenceFailed", function(event) {
              console.error("✗ Falha na conferência", event);
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "conferenceFailed",
                message: "Falha ao conectar"
              }));
            });

            // Event: Pronto para fechar
            api.addEventListener("readyToClose", function() {
              console.log("Conferência encerrada");
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "conferenceTerminated",
                message: "Conferência encerrada"
              }));
            });

            // Event: Novo participante
            api.addEventListener("participantJoined", function(event) {
              console.log("Novo participante", event);
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "participantJoined",
                participantId: event.id
              }));
            });

            // Event: Participante saiu
            api.addEventListener("participantLeft", function(event) {
              console.log("Participante saiu", event);
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "participantLeft",
                participantId: event.id
              }));
            });

            // Event: Erro
            api.addEventListener("errorOccurred", function(event) {
              console.error("Erro Jitsi", event);
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "error",
                message: event.error || "Erro desconhecido"
              }));
            });

            // Event: Falha de conexão
            api.addEventListener("connectionFailed", function() {
              console.error("Falha de conexão");
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "connectionFailed",
                message: "Falha na conexão"
              }));
            });

            // Event: Conexão interrompida
            api.addEventListener("connectionInterrupted", function() {
              console.warn("Conexão interrompida");
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "connectionInterrupted",
                message: "Reconectando..."
              }));
            });

            console.log("✓ Jitsi Meet inicializado com sucesso");

            // Timeout de 15 segundos para carregar
            loadTimeout = setTimeout(() => {
              console.warn("Timeout ao carregar Jitsi");
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "timeout",
                message: "Timeout ao conectar"
              }));
            }, 15000);

            // Fallback após 10 segundos
            fallbackTimeout = setTimeout(() => {
              console.log("Escondendo loading screen (fallback)");
              window.ReactNativeWebView?.postMessage(JSON.stringify({
                type: "conferenceJoined",
                message: "Carregando..."
              }));
            }, 10000);

          } catch (err) {
            console.error("Erro ao inicializar Jitsi Meet:", err);
            window.ReactNativeWebView?.postMessage(JSON.stringify({
              type: "error",
              message: err.message || "Erro ao inicializar"
            }));
          }
        }

        // Aguardar o script carregar
        function waitForJitsi() {
          if (typeof JitsiMeetExternalAPI !== 'undefined') {
            initJitsi();
          } else {
            setTimeout(waitForJitsi, 100);
          }
        }

        // Iniciar quando o DOM estiver pronto
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', waitForJitsi);
        } else {
          waitForJitsi();
        }
      </script>
    </body>
    </html>
  `;

  const handleWebViewMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log("📨 Mensagem recebida:", message.type);

      switch (message.type) {
        case "conferenceJoined":
          setIsLoading(false);
          setError(null);
          console.log("✓ Conferência ativa");
          break;
        case "conferenceFailed":
        case "connectionFailed":
        case "timeout":
          if (retryCount < 3) {
            setError(`${message.message}. Tentando novamente...`);
            setTimeout(() => {
              setRetryCount(retryCount + 1);
              setError(null);
              setIsLoading(true);
              webViewRef.current?.reload();
            }, 2000);
          } else {
            setError("Falha ao conectar após 3 tentativas. Verifique sua conexão.");
            setIsLoading(false);
          }
          break;
        case "conferenceTerminated":
          handleGoBack();
          break;
        case "connectionInterrupted":
          setError("Reconectando...");
          break;
        case "error":
          setError(message.message || "Erro desconhecido");
          break;
      }
    } catch (err) {
      console.error("Erro ao processar mensagem:", err);
    }
  };

  const handleWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.error("WebView error:", nativeEvent);
    if (retryCount < 3) {
      setRetryCount(retryCount + 1);
      webViewRef.current?.reload();
    } else {
      setError("Erro ao carregar videoconferência. Verifique sua conexão.");
    }
  };

  const handleGoBack = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {
      console.warn("Haptics not available");
    }
    router.back();
  };

  const handleRetry = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {
      console.warn("Haptics not available");
    }
    setError(null);
    setIsLoading(true);
    setRetryCount(0);
    webViewRef.current?.reload();
  };

  if (error) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Erro ao Conectar</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          {retryCount < 3 && (
            <TouchableOpacity
              onPress={handleRetry}
              style={styles.retryButton}
            >
              <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            onPress={handleGoBack} 
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF8C42" />
          <Text style={styles.loadingText}>
            Conectando à videoconferência...
          </Text>
          <Text style={styles.loadingSubtext}>
            Sala: {roomName}
          </Text>
          {retryCount > 0 && (
            <Text style={styles.retryText}>
              Tentativa {retryCount} de 3
            </Text>
          )}
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webView}
        onError={handleWebViewError}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        originWhitelist={["*"]}
        mixedContentMode="always"
        userAgent={Platform.OS === "android" ? "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36" : undefined}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        textZoom={100}
      />

      {/* Botão flutuante para sair */}
      {!isLoading && !error && (
        <TouchableOpacity
          onPress={handleGoBack}
          style={[styles.exitButton, { bottom: insets.bottom + 20 }]}
          activeOpacity={0.8}
        >
          <Text style={styles.exitButtonText}>✕ Sair</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 12,
    color: "#FF8C42",
  },
  retryText: {
    marginTop: 8,
    fontSize: 12,
    color: "#FFB366",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF8C42",
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: "#FF8C42",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
    width: "100%",
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    borderWidth: 2,
    borderColor: "#FF8C42",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
  },
  backButtonText: {
    color: "#FF8C42",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  exitButton: {
    position: "absolute",
    right: 20,
    backgroundColor: "#FF4444",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
  },
  exitButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
