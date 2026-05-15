import { ScrollView, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useColors } from "@/hooks/use-colors";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function TasksScreen() {
  const { user } = useAuth();
  const colors = useColors();
  const { data: tasks, refetch } = trpc.tasks.list.useQuery();
  const { data: conferences } = trpc.conferences.list.useQuery();
  const createTaskMutation = trpc.tasks.create.useMutation({ onSuccess: () => refetch() });
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async () => {
    if (!title.trim()) return;
    await createTaskMutation.mutateAsync({
      title,
      description,
      status: "pending",
      priority: "medium",
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
          <Text className="text-white text-3xl font-bold">Minhas Tarefas</Text>
          <Text className="text-white text-sm mt-1 opacity-90">
            Gerencie suas tarefas e lembretes
          </Text>
        </LinearGradient>

        {showForm && (
          <View className="bg-surface rounded-xl p-4 mb-4 border border-border">
            <TextInput
              placeholder="Titulo da tarefa"
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
                onPress={handleCreateTask}
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
            <Text className="text-white text-center font-bold">Adicionar Tarefa</Text>
          </TouchableOpacity>
        )}

        {tasks && tasks.length > 0 ? (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
                <View className="flex-row items-start justify-between mb-2">
                  <Text className="text-foreground font-bold flex-1">{item.title}</Text>
                  <View
                    className={`px-2 py-1 rounded-full ${
                      item.status === "completed"
                        ? "bg-green-100"
                        : item.status === "in_progress"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                    }`}
                  >
                    <Text className="text-xs font-semibold">{item.status}</Text>
                  </View>
                </View>
                {item.description && (
                  <Text className="text-muted text-sm mb-2">{item.description}</Text>
                )}
                {item.dueDate && (
                  <Text className="text-muted text-xs">
                    Vencimento: {new Date(item.dueDate).toLocaleDateString("pt-BR")}
                  </Text>
                )}
              </View>
            )}
          />
        ) : (
          <View className="bg-surface rounded-lg p-6 items-center justify-center">
            <Text className="text-muted text-sm">Nenhuma tarefa criada ainda</Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
