import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { trpc } from "@/lib/trpc";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ScheduleConferenceScreen() {
  const { user } = useAuth();
  const colors = useColors();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roomName, setRoomName] = useState(`study-${Date.now()}`);
  const [duration, setDuration] = useState("60");
  const [scheduledTime, setScheduledTime] = useState(new Date(Date.now() + 3600000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createConferenceMutation = trpc.conferences.create.useMutation();
  const createTaskMutation = trpc.tasks.create.useMutation();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setScheduledTime(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setScheduledTime(selectedDate);
    }
    setShowTimePicker(false);
  };

  const handleSchedule = async () => {
    if (!title.trim()) {
      Alert.alert("Erro", "Por favor, digite um título para a videoconferência");
      return;
    }

    if (scheduledTime <= new Date()) {
      Alert.alert("Erro", "A data e hora devem ser no futuro");
      return;
    }

    setIsLoading(true);
    try {
      // Agendar a videoconferência
      await createConferenceMutation.mutateAsync({
        title,
        description,
        roomName,
        scheduledTime,
        duration: parseInt(duration),
      });

      // Criar tarefa de lembrete automaticamente
      await createTaskMutation.mutateAsync({
        title: `📹 ${title}`,
        description: `Videoconferência agendada. Sala: ${roomName}`,
        status: "pending",
        priority: "high",
        dueDate: scheduledTime,
      });

      Alert.alert("Sucesso", "Videoconferência agendada com sucesso! Um lembrete foi criado em suas tarefas.");
      router.back();
    } catch (error) {
      console.error("Erro ao agendar:", error);
      Alert.alert("Erro", "Falha ao agendar videoconferência");
    } finally {
      setIsLoading(false);
    }
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
          <Text className="text-white text-3xl font-bold">Agendar Videoconferência</Text>
          <Text className="text-white text-sm mt-2 opacity-90">
            Crie uma videoconferência e receba lembretes automáticos
          </Text>
        </LinearGradient>

        <View className="gap-4">
          {/* Título */}
          <View>
            <Text className="text-foreground font-semibold mb-2">Título</Text>
            <TextInput
              placeholder="Ex: Estudo de Matemática"
              value={title}
              onChangeText={setTitle}
              className="bg-surface border border-border rounded-lg p-3 text-foreground"
              placeholderTextColor={colors.muted}
            />
          </View>

          {/* Descrição */}
          <View>
            <Text className="text-foreground font-semibold mb-2">Descrição</Text>
            <TextInput
              placeholder="Detalhes da videoconferência"
              value={description}
              onChangeText={setDescription}
              className="bg-surface border border-border rounded-lg p-3 text-foreground"
              placeholderTextColor={colors.muted}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Nome da Sala */}
          <View>
            <Text className="text-foreground font-semibold mb-2">Nome da Sala</Text>
            <TextInput
              placeholder="Nome único para a sala"
              value={roomName}
              onChangeText={setRoomName}
              className="bg-surface border border-border rounded-lg p-3 text-foreground"
              placeholderTextColor={colors.muted}
            />
          </View>

          {/* Duração */}
          <View>
            <Text className="text-foreground font-semibold mb-2">Duração (minutos)</Text>
            <TextInput
              placeholder="60"
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
              className="bg-surface border border-border rounded-lg p-3 text-foreground"
              placeholderTextColor={colors.muted}
            />
          </View>

          {/* Data */}
          <View>
            <Text className="text-foreground font-semibold mb-2">Data</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="bg-surface border border-border rounded-lg p-3 active:opacity-80"
            >
              <Text className="text-foreground">
                {scheduledTime.toLocaleDateString("pt-BR")}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={scheduledTime}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Hora */}
          <View>
            <Text className="text-foreground font-semibold mb-2">Hora</Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="bg-surface border border-border rounded-lg p-3 active:opacity-80"
            >
              <Text className="text-foreground">
                {scheduledTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={scheduledTime}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          {/* Botões */}
          <View className="flex-row gap-3 mt-6">
            <TouchableOpacity
              onPress={() => router.back()}
              disabled={isLoading}
              className="flex-1 bg-surface border border-border rounded-lg py-3 active:opacity-80"
            >
              <Text className="text-foreground text-center font-bold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSchedule}
              disabled={isLoading}
              className="flex-1 bg-primary rounded-lg py-3 active:opacity-80"
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-bold">Agendar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
