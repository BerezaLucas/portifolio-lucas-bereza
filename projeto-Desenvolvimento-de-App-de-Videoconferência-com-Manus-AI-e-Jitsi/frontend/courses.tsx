import { ScrollView, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useColors } from "@/hooks/use-colors";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function CoursesScreen() {
  const { user } = useAuth();
  const colors = useColors();
  const { data: courses, refetch } = trpc.courses.list.useQuery();
  const createCourseMutation = trpc.courses.create.useMutation({ onSuccess: () => refetch() });
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateCourse = async () => {
    if (!title.trim()) return;
    await createCourseMutation.mutateAsync({
      title,
      description,
    });
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <LinearGradient
          colors={["#FF8C42", "#FFB366"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-6 mb-6"
        >
          <Text className="text-white text-3xl font-bold">Meus Cursos</Text>
          <Text className="text-white text-sm mt-1 opacity-90">
            Acompanhe seu progresso nos cursos
          </Text>
        </LinearGradient>

        {showForm && (
          <View className="bg-surface rounded-xl p-4 mb-4 border border-border">
            <TextInput
              placeholder="Nome do curso"
              value={title}
              onChangeText={setTitle}
              className="bg-background text-foreground px-3 py-2 rounded-lg mb-2"
              placeholderTextColor={colors.muted}
            />
            <TextInput
              placeholder="Descricao (opcional)"
              value={description}
              onChangeText={setDescription}
              className="bg-background text-foreground px-3 py-2 rounded-lg mb-3"
              placeholderTextColor={colors.muted}
              multiline
            />
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={handleCreateCourse}
                className="flex-1 bg-primary rounded-lg py-2 active:opacity-80"
              >
                <Text className="text-white text-center font-bold">Criar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowForm(false)}
                className="flex-1 bg-surface border border-border rounded-lg py-2 active:opacity-80"
              >
                <Text className="text-foreground text-center font-bold">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!showForm && (
          <TouchableOpacity
            onPress={() => setShowForm(true)}
            className="bg-primary rounded-lg py-3 mb-4 active:opacity-80"
          >
            <Text className="text-white text-center font-bold">Adicionar Curso</Text>
          </TouchableOpacity>
        )}

        {courses && courses.length > 0 ? (
          <FlatList
            data={courses}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-foreground font-bold">{item.title}</Text>
                    {item.description && (
                      <Text className="text-muted text-sm mt-1">{item.description}</Text>
                    )}
                  </View>
                </View>
                <View className="mt-3">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-muted text-xs">Progresso</Text>
                    <Text className="text-foreground text-xs font-bold">{item.progress || 0}%</Text>
                  </View>
                  <View className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-primary"
                      style={{ width: `${item.progress || 0}%` }}
                    />
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <View className="bg-surface rounded-lg p-6 items-center justify-center">
            <Text className="text-muted text-sm">Nenhum curso adicionado ainda</Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
