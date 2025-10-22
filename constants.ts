import type { Language } from './types';

export { Language };

export const translations: Record<Language, any> = {
    pt: {
        welcomeTagline: 'Tecnologia com alma gentil.',
        welcomeDescription: 'Olá! Eu sou a Sena, sua assistente digital. Estou aqui para tornar a tecnologia simples e acessível para você. Vamos começar?',
        welcomeFeaturesTitle: '✨ O que posso fazer por você:',
        welcomeFeaturesList: [
            '📚 Explicar conceitos de tecnologia de forma simples',
            '📅 Ajudar na organização do seu dia a dia',
            '💡 Responder perguntas sobre diversos assuntos',
            '🎯 Criar lembretes e sugestões personalizadas',
            '🗣️ Conversar por voz (clique no microfone)'
        ],
        welcomeDisclaimer: '⚠️ <strong>Aviso:</strong> Sou uma inteligência artificial e posso cometer erros. Sempre verifique informações importantes em fontes confiáveis.',
        welcomeTerms: 'Li e aceito os <a href="https://termos.orpheostudio.com.br" target="_blank" class="text-purple-600 dark:text-purple-400 underline hover:text-purple-700 dark:hover:text-purple-300">Termos de Uso</a> e <a href="https://políticas.orpheostudio.com.br" target="_blank" class="text-purple-600 dark:text-purple-400 underline hover:text-purple-700 dark:hover:text-purple-300">Políticas de Privacidade</a> da Orpheo Studio.',
        startButton: 'Começar a conversar 🌸',
        headerTagline: 'Tecnologia com alma gentil',
        statusText: 'MiraAI Conectado',
        listeningText: 'Ouvindo...',
        footerTagline: 'As respostas da Sena utilizam MiraAI by Orpheo Studio. 🌸',
        footerDisclaimer: 'Sena pode cometer erros. Verifique informações importantes.',
        inputPlaceholder: 'Digite sua pergunta...',
        greeting: 'Olá! Eu sou a Sena. 🌸<br>A tecnologia com alma gentil.<br><br>Pode me chamar para o que precisar. Eu aprendo com você.',
        suggestions: [
            'O que você pode fazer?',
            'Como baixo um app no celular?',
            'Pode me explicar sobre os termos e politicas da Orpheo?',
            'Como doar para a Orpheo Studio?'
        ],
        errorResponse: 'Desculpe, tive um problema para processar sua mensagem. Pode tentar novamente? 😔',
        
        // New Features
        chatMode: 'Chat',
        liveMode: 'Ao Vivo',
        imageMode: 'Imagem',
        videoMode: 'Vídeo',
        
        imageEditorTitle: 'Editor de Imagens ✨',
        videoGeneratorTitle: 'Gerador de Vídeos 🎬',
        liveAudioTitle: 'Conversa ao Vivo 🎙️',

        uploadImagePrompt: 'Clique para carregar uma imagem',
        editPromptPlaceholder: 'Digite o que você quer mudar...',
        videoPromptPlaceholder: 'Descreva o vídeo que você quer criar...',
        generateButton: 'Gerar',
        generating: 'Gerando...',
        
        // Video Generator
        aspectRatio: 'Proporção',
        generatingVideoStatus: 'Gerando seu vídeo... Isso pode levar alguns minutos. ⏳',
        selectApiKeyPrompt: 'Para gerar vídeos, por favor selecione uma chave de API do Google AI Studio.',
        selectKeyButton: 'Selecionar Chave de API',
        billingInfoLink: 'Para mais informações sobre cobrança, visite a documentação.',
        videoError: 'Ocorreu um erro ao gerar o vídeo. Por favor, verifique sua chave de API e tente novamente.',
        
        // Live Audio
        connect: 'Conectar',
        disconnect: 'Desconectar',
        statusConnecting: 'Conectando...',
        statusConnected: 'Conectado! Fale agora.',
        statusDisconnected: 'Desconectado',
        statusError: 'Erro de conexão',
    },
    en: {
        welcomeTagline: 'Technology with a gentle soul.',
        welcomeDescription: 'Hello! I am Sena, your digital assistant. I am here to make technology simple and accessible for you. Shall we begin?',
        welcomeFeaturesTitle: '✨ What I can do for you:',
        welcomeFeaturesList: [
            '📚 Explain technology concepts in a simple way',
            '📅 Help organize your daily life',
            '💡 Answer questions on various subjects',
            '🎯 Create reminders and personalized suggestions',
            '🗣️ Chat by voice (click the microphone)'
        ],
        welcomeDisclaimer: '⚠️ <strong>Notice:</strong> I am an artificial intelligence and may make mistakes. Always verify important information from reliable sources.',
        welcomeTerms: 'I have read and accept the <a href="https://termos.orpheostudio.com.br" target="_blank" class="text-purple-600 dark:text-purple-400 underline hover:text-purple-700 dark:hover:text-purple-300">Terms of Use</a> and <a href="https://políticas.orpheostudio.com.br" target="_blank" class="text-purple-600 dark:text-purple-400 underline hover:text-purple-700 dark:hover:text-purple-300">Privacy Policy</a> of Orpheo Studio.',
        startButton: 'Start chatting 🌸',
        headerTagline: 'Technology with a gentle soul',
        statusText: 'Online and ready to help',
        listeningText: 'Listening...',
        footerTagline: 'Easy as talking. 🌸',
        footerDisclaimer: 'Sena may make mistakes. Verify important information.',
        inputPlaceholder: 'Type your question...',
        greeting: 'Hello! I am Sena. 🌸<br>Technology with a gentle soul.<br><br>Call me for anything you need. I learn with you.',
        suggestions: [
            'Help me understand what artificial intelligence means?',
            'How do I download an app on my phone?',
            'What does 5G mean?',
            'I want to start meditating'
        ],
        errorResponse: 'Sorry, I had a problem processing your message. Could you please try again? 😔',
        
        // New Features
        chatMode: 'Chat',
        liveMode: 'Live',
        imageMode: 'Image',
        videoMode: 'Video',

        imageEditorTitle: 'Image Editor ✨',
        videoGeneratorTitle: 'Video Generator 🎬',
        liveAudioTitle: 'Live Conversation 🎙️',

        uploadImagePrompt: 'Click to upload an image',
        editPromptPlaceholder: 'Type what you want to change...',
        videoPromptPlaceholder: 'Describe the video you want to create...',
        generateButton: 'Generate',
        generating: 'Generating...',
        
        // Video Generator
        aspectRatio: 'Aspect Ratio',
        generatingVideoStatus: 'Generating your video... This may take a few minutes. ⏳',
        selectApiKeyPrompt: 'To generate videos, please select a Google AI Studio API key.',
        selectKeyButton: 'Select API Key',
        billingInfoLink: 'For more information on billing, please visit the documentation.',
        videoError: 'An error occurred while generating the video. Please check your API key and try again.',

        // Live Audio
        connect: 'Connect',
        disconnect: 'Disconnect',
        statusConnecting: 'Connecting...',
        statusConnected: 'Connected! Speak now.',
        statusDisconnected: 'Disconnected',
        statusError: 'Connection Error',
    },
    es: {
        welcomeTagline: 'Tecnología con alma gentil.',
        welcomeDescription: '¡Hola! Soy Sena, tu asistente digital. Estoy aquí para hacer la tecnología simple y accesible para ti. ¿Empezamos?',
        welcomeFeaturesTitle: '✨ Lo que puedo hacer por ti:',
        welcomeFeaturesList: [
            '📚 Explicar conceptos de tecnología de forma simple',
            '📅 Ayudar en la organización de tu día a día',
            '💡 Responder preguntas sobre diversos temas',
            '🎯 Crear recordatorios y sugerencias personalizadas',
            '🗣️ Conversar por voz (haz clic en el micrófono)'
        ],
        welcomeDisclaimer: '⚠️ <strong>Aviso:</strong> Soy una inteligencia artificial y puedo cometer errores. Siempre verifica información importante en fuentes confiables.',
        welcomeTerms: 'He leído y acepto los <a href="https://termos.orpheostudio.com.br" target="_blank" class="text-purple-600 dark:text-purple-400 underline hover:text-purple-700 dark:hover:text-purple-300">Términos de Uso</a> y <a href="https://políticas.orpheostudio.com.br" target="_blank" class="text-purple-600 dark:text-purple-400 underline hover:text-purple-700 dark:hover:text-purple-300">Políticas de Privacidad</a> de Orpheo Studio.',
        startButton: 'Comenzar a conversar 🌸',
        headerTagline: 'Tecnología con alma gentil',
        statusText: 'En línea y lista para ayudar',
        listeningText: 'Escuchando...',
        footerTagline: 'MiraAI Conectado. 🌸',
        footerDisclaimer: 'Sena puede cometer errores. Verifica información importante.',
        inputPlaceholder: 'Escribe tu pregunta...',
        greeting: '¡Hola! Soy Sena. 🌸<br>Tecnología con alma gentil.<br><br>Llámame para lo que necesites. Aprendo contigo.',
        suggestions: [
            '¿Me ayudas a entender qué significa inteligencia artificial?',
            '¿Cómo descargo una app en el celular?',
            '¿Qué significa 5G?',
            'Quiero empezar a meditar'
        ],
        errorResponse: 'Disculpa, tuve un problema al procesar tu mensaje. ¿Podrías intentarlo de nuevo? 😔',

        // New Features
        chatMode: 'Chat',
        liveMode: 'En Vivo',
        imageMode: 'Imagen',
        videoMode: 'Video',

        imageEditorTitle: 'Editor de Imágenes ✨',
        videoGeneratorTitle: 'Generador de Videos 🎬',
        liveAudioTitle: 'Conversación en Vivo 🎙️',

        uploadImagePrompt: 'Haz clic para subir una imagen',
        editPromptPlaceholder: 'Escribe lo que quieres cambiar...',
        videoPromptPlaceholder: 'Describe el video que quieres crear...',
        generateButton: 'Generar',
        generating: 'Generando...',

        // Video Generator
        aspectRatio: 'Relación de Aspecto',
        generatingVideoStatus: 'Generando tu video... Esto puede tardar unos minutos. ⏳',
        selectApiKeyPrompt: 'Para generar videos, por favor selecciona una clave de API de Google AI Studio.',
        selectKeyButton: 'Seleccionar Clave de API',
        billingInfoLink: 'Para más información sobre facturación, visita la documentación.',
        videoError: 'Ocurrió un error al generar el video. Por favor, revisa tu clave de API e inténtalo de nuevo.',

        // Live Audio
        connect: 'Conectar',
        disconnect: 'Desconectar',
        statusConnecting: 'Conectando...',
        statusConnected: '¡Conectado! Habla ahora.',
        statusDisconnected: 'Desconectado',
        statusError: 'Error de Conexión',
    }
};
