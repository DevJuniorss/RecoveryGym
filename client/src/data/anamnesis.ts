import { Anamnesis } from '@/types/anamnesis'

export const anamnesis: Anamnesis = {
  id: 1,
  painLocation: 'Ombro direito', // Onde dói?
  painStartDate: '10 de Janeiro de 2025', // Quando começou?
  painOnset: 'Após esforço físico', // Como começou?
  painProgression: 'Piorou gradualmente ao longo dos dias', // Como evoluiu?
  painType: 'Pontada', // Qual o tipo da dor?
  painDuration: '30 minutos por episódio', // Qual a duração da crise?
  painRadiation: 'Sim, para o braço direito', // É uma dor que se espalha ou não?
  painIntensity: '8/10', // Qual a intensidade da dor?
  painActivityLimitation: 'Sim, dificulta levantar peso', // A dor impede a realização de alguma tarefa?
  painPeakTime: 'Fim do dia', // Em que hora do dia ela é mais forte?
  painReliefFactors: 'Compressa quente e repouso', // Existe alguma coisa que o sr. faça que a dor melhore?
  painWorseningFactors: 'Movimentos repetitivos e esforço físico', // E que piora?
  painRelatedSymptoms: 'Formigamento no braço', // A dor é acompanhada de mais algum sintoma?
}
