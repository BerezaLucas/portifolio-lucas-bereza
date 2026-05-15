import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useColors } from "@/hooks/use-colors";
import { trpc } from "@/lib/trpc";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { user } = useAuth();
  const colors = useColors();
  const router = useRouter();
  const { data: tasks } = trpc.tasks.list.useQuery();
  const { data: courses } = trpc.courses.list.useQuery();
  const { data: works } = trpc.works.list.useQuery();

  const completedTasks = tasks?.filter((t) => t.status === "completed").length || 0;
  const completedWorks = works?.filter((w) => w.completed).length || 0;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <LinearGradient
          colors={["#FF8C42", "#FFB366"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-6 mb-6"
        >
          <Text className="text-white text-sm opacity-80">Bem-vindo de volta!</Text>
          <Text className="text-white text-3xl font-bold mt-2">{user?.name || "Estudante"}</Text>
          <Text className="text-white text-sm mt-1 opacity-90">
            Vamos continuar seus estudos!
          </Text>
        </LinearGradient>

        <View className="gap-4 mb-6">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-muted text-sm font-semibold">Tarefas</Text>
                <Text className="text-foreground text-2xl font-bold mt-1">
                  {completedTasks}/{tasks?.length || 0}
                </Text>
                <Text className="text-muted text-xs mt-1">Concluidas</Text>
              </View>
              <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center">
                <Text className="text-2xl">OK</Text>
              </View>
            </View>
          </View>

          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-muted text-sm font-semibold">Cursos</Text>
                <Text className="text-foreground text-2xl font-bold mt-1">{courses?.length || 0}</Text>
                <Text className="text-muted text-xs mt-1">Em andamento</Text>
              </View>
              <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center">
                <Text className="text-2xl">LIV</Text>
              </View>
            </View>
          </View>

          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-muted text-sm font-semibold">Trabalhos</Text>
                <Text className="text-foreground text-2xl font-bold mt-1">
                  {completedWorks}/{works?.length || 0}
                </Text>
                <Text className="text-muted text-xs mt-1">Concluidos</Text>
              </View>
              <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center">
                <Text className="text-2xl">DOC</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-foreground text-lg font-bold">Proximas Tarefas</Text>
            <TouchableOpacity>
              <Text className="text-primary text-sm font-semibold">Ver tudo</Text>
            </TouchableOpacity>
          </View>

          {tasks && tasks.length > 0 ? (
            <FlatList
              data={tasks.slice(0, 3)}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View className="bg-surface rounded-lg p-4 mb-2 border border-border">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <Text className="text-foreground font-semibold">{item.title}</Text>
                      {item.description && (
                        <Text className="text-muted text-xs mt-1">{item.description}</Text>
                      )}
                    </View>
                    <View
                      className={`px-2 py-1 rounded-full ${
                        item.priority === "high"
                          ? "bg-red-100"
                          : item.priority === "medium"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                      }`}
                    >
                      <Text className="text-xs font-semibold">{item.priority}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <View className="bg-surface rounded-lg p-6 items-center justify-center">
              <Text className="text-muted text-sm">Nenhuma tarefa pendente</Text>
            </View>
          )}
        </View>

        <View className="gap-3">
          <Text className="text-foreground text-lg font-bold mb-2">Acoes Rapidas</Text>
          <TouchableOpacity
            onPress={() => router.push("/videoconference")}
            className="bg-primary rounded-lg py-4 active:opacity-80"
          >
            <Text className="text-white text-center font-bold">Iniciar Videoconferencia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/schedule-conference")}
            className="bg-surface border border-primary rounded-lg py-4 active:opacity-80"
          >
            <Text className="text-primary text-center font-bold">Agendar Videoconferencia</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
