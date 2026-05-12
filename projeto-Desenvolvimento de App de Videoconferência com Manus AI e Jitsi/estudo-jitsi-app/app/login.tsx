import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/use-auth";
import { useColors } from "@/hooks/use-colors";

export default function LoginScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const colors = useColors();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated && user) {
    router.replace("/(tabs)");
    return null;
  }

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      router.replace("/(tabs)");
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  return (
    <LinearGradient
      colors={["#FF8C42", "#FFB366"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <ScreenContainer className="justify-between py-8">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="items-center gap-4 mt-12 mb-8">
            <View className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-lg">
              <Text className="text-4xl font-bold text-orange-500">📚</Text>
            </View>
            <Text className="text-4xl font-bold text-white text-center">Estudo & Jitsi</Text>
            <Text className="text-base text-white text-center opacity-90">
              Estude e colabore com seus colegas
            </Text>
          </View>

          <View className="gap-4 mt-8">
            <View>
              <Text className="text-white font-semibold mb-2">Email</Text>
              <TextInput
                placeholder="seu@email.com"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={email}
                onChangeText={setEmail}
                editable={!isLoading}
                className="bg-white bg-opacity-20 text-white px-4 py-3 rounded-lg font-semibold"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-white font-semibold mb-2">Senha</Text>
              <TextInput
                placeholder="Sua senha"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
                secureTextEntry
                className="bg-white bg-opacity-20 text-white px-4 py-3 rounded-lg font-semibold"
              />
            </View>

            {error && (
              <View className="bg-red-100 border border-red-400 rounded-lg p-3">
                <Text className="text-red-700 text-sm font-semibold">{error}</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className="bg-white rounded-lg py-3 mt-4 active:opacity-80"
            >
              {isLoading ? (
                <ActivityIndicator color="#FF8C42" />
              ) : (
                <Text className="text-center font-bold text-lg text-orange-500">Entrar</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            <TouchableOpacity>
              <Text className="text-white text-center text-sm underline opacity-80">
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View className="flex-row items-center justify-center gap-2 pb-4">
          <Text className="text-white text-sm">Nao tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)")}>
            <Text className="text-white font-bold text-sm underline">Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    </LinearGradient>
  );
}
