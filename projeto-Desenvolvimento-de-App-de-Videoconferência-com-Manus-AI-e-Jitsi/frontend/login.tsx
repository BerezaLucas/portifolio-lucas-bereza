import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { startOAuthLogin } from "@/constants/oauth";
import * as Haptics from "expo-haptics";

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await startOAuthLogin();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao fazer login";
      setError(message);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.push("/(tabs)/signup" as any);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao ir para cadastro";
      setError(message);
      console.error("SignUp navigation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6 gap-8">
          {/* Header */}
          <View className="items-center gap-4">
            <LinearGradient
              colors={["#FF8C42", "#FFB366"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-24 h-24 rounded-full items-center justify-center"
            >
              <Text className="text-4xl">📚</Text>
            </LinearGradient>
            <Text className="text-3xl font-bold text-foreground text-center">
              Estudo & Jitsi
            </Text>
            <Text className="text-base text-muted text-center">
              Estude, colabore e acompanhe seu progresso
            </Text>
          </View>

          {/* Error Message */}
          {error && (
            <View className="bg-error bg-opacity-10 border border-error rounded-lg p-4">
              <Text className="text-error text-sm font-semibold">{error}</Text>
            </View>
          )}

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className="active:opacity-80"
          >
            <LinearGradient
              colors={["#FF8C42", "#FFB366"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-lg py-4 items-center"
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-lg font-bold">Entrar com Conta</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-px bg-border" />
            <Text className="text-muted text-sm">ou</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            className="active:opacity-80"
          >
            <View className="border-2 border-primary rounded-lg py-4 items-center">
              {isLoading ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <Text className="text-primary text-lg font-bold">Criar Conta</Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Info Text */}
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-muted text-xs leading-relaxed">
              Ao fazer login ou criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
