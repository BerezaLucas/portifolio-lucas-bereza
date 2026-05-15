import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { trpc } from "@/lib/trpc";
import * as Auth from "@/lib/_core/auth";

export default function SignUpScreen() {
  const colors = useColors();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const createUserMutation = trpc.users.create.useMutation();

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Nome é obrigatório");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email é obrigatório");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Email inválido");
      return false;
    }
    if (!formData.password) {
      setError("Senha é obrigatória");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Senhas não conferem");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    try {
      setError(null);
      if (!validateForm()) return;

      setIsLoading(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Criar usuário no banco de dados
      const result = await createUserMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }) as any;

      // Salvar informações do usuário
      await Auth.setUserInfo({
        id: result.id,
        openId: result.email,
        name: result.name,
        email: result.email,
        loginMethod: "local",
        lastSignedIn: new Date(),
      });

      // Redirecionar para home
      router.replace("/(tabs)");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao criar conta";
      setError(message);
      console.error("SignUp error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="gap-4 mb-8">
          <TouchableOpacity onPress={handleGoBack} className="active:opacity-60">
            <Text className="text-primary text-lg font-semibold">← Voltar</Text>
          </TouchableOpacity>

          <LinearGradient
            colors={["#FF8C42", "#FFB366"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-2xl p-6"
          >
            <Text className="text-white text-3xl font-bold">Criar Conta</Text>
            <Text className="text-white text-sm mt-2 opacity-90">
              Junte-se à comunidade de estudantes
            </Text>
          </LinearGradient>
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-error bg-opacity-10 border border-error rounded-lg p-4 mb-6">
            <Text className="text-error text-sm font-semibold">{error}</Text>
          </View>
        )}

        {/* Form */}
        <View className="gap-4 mb-6">
          {/* Name Input */}
          <View>
            <Text className="text-foreground text-sm font-semibold mb-2">Nome Completo</Text>
            <TextInput
              placeholder="Seu nome"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              editable={!isLoading}
              placeholderTextColor={colors.muted}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            />
          </View>

          {/* Email Input */}
          <View>
            <Text className="text-foreground text-sm font-semibold mb-2">Email</Text>
            <TextInput
              placeholder="seu.email@exemplo.com"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              editable={!isLoading}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.muted}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            />
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-foreground text-sm font-semibold mb-2">Senha</Text>
            <TextInput
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              editable={!isLoading}
              secureTextEntry
              placeholderTextColor={colors.muted}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            />
          </View>

          {/* Confirm Password Input */}
          <View>
            <Text className="text-foreground text-sm font-semibold mb-2">Confirmar Senha</Text>
            <TextInput
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              editable={!isLoading}
              secureTextEntry
              placeholderTextColor={colors.muted}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            />
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSignUp}
          disabled={isLoading}
          className="active:opacity-80 mb-4"
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
              <Text className="text-white text-lg font-bold">Criar Conta</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Terms */}
        <View className="bg-surface rounded-lg p-4 border border-border">
          <Text className="text-muted text-xs leading-relaxed">
            Ao criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
