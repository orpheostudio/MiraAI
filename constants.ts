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
        statusText: 'Mistral Conectado',
        listeningText: 'Ouvindo...',
        footerTagline: 'As respostas da Sena utilizam Mistral by Orpheo Studio. 🌸',
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
        
        // Features
        chatMode: 'Chat',
        liveMode: 'Ao Vivo',
        imageMode: 'Imagem',
        videoMode: 'Vídeo',
        toolsMode: 'Ferramentas',
        
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

        // Tools
        toolsTitle: 'Ferramentas Úteis 🛠️',
        toolsDescription: 'Aqui estão algumas ferramentas simples para ajudar no seu dia a dia.',
        qrCodeGeneratorTitle: 'Gerador de QR Code',
        qrCodeGeneratorDescription: 'Crie um QR Code para um link ou texto.',
        qrCodeInputPlaceholder: 'Digite o texto ou URL aqui',
        qrCodeGenerateButton: 'Gerar QR Code',
        passwordGeneratorTitle: 'Gerador de Senhas',
        passwordGeneratorDescription: 'Crie senhas fortes e seguras.',
        passwordLength: 'Comprimento:',
        passwordIncludeNumbers: 'Incluir números',
        passwordIncludeSymbols: 'Incluir símbolos',
        passwordGenerateButton: 'Gerar Nova Senha',
        passwordCopied: 'Senha copiada!',
        appSettingsTitle: 'Configurações do App',
        appSettingsDescription: 'Ajuste o idioma, a aparência e reporte problemas.',
        darkModeLabel: 'Modo Escuro',
        languageLabel: 'Idioma',
        reportBugLabel: 'Reportar um Bug',

        // Welcome Email Notification
        welcomeEmailSubject: '🎉 Novo Usuário na Sena!',
        welcomeEmailBody: 'Um novo usuário começou a usar a Sena.\n\n- ID do Dispositivo: {deviceId}\n- Idioma: {language}\n\n🌸',
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
        statusText: 'Mistral Connected',
        listeningText: 'Listening...',
        footerTagline: 'Sena\'s responses use Mistral by Orpheo Studio. 🌸',
        footerDisclaimer: 'Sena may make mistakes. Verify important information.',
        inputPlaceholder: 'Type your question...',
        greeting: 'Hello! I am Sena. 🌸<br>Technology with a gentle soul.<br><br>Call me for anything you need. I learn with you.',
        suggestions: [
            'What can you do?',
            'How do I download an app on my phone?',
            'Can you explain Orpheo\'s terms and policies?',
            'How to donate to Orpheo Studio?'
        ],
        errorResponse: 'Sorry, I had a problem processing your message. Could you please try again? 😔',
        
        // Features
        chatMode: 'Chat',
        liveMode: 'Live',
        imageMode: 'Image',
        videoMode: 'Video',
        toolsMode: 'Tools',

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

        // Tools
        toolsTitle: 'Useful Tools 🛠️',
        toolsDescription: 'Here are some simple tools to help with your daily tasks.',
        qrCodeGeneratorTitle: 'QR Code Generator',
        qrCodeGeneratorDescription: 'Create a QR Code for a link or text.',
        qrCodeInputPlaceholder: 'Enter text or URL here',
        qrCodeGenerateButton: 'Generate QR Code',
        passwordGeneratorTitle: 'Password Generator',
        passwordGeneratorDescription: 'Create strong and secure passwords.',
        passwordLength: 'Length:',
        passwordIncludeNumbers: 'Include numbers',
        passwordIncludeSymbols: 'Include symbols',
        passwordGenerateButton: 'Generate New Password',
        passwordCopied: 'Password copied!',
        appSettingsTitle: 'App Settings',
        appSettingsDescription: 'Adjust language, appearance, and report issues.',
        darkModeLabel: 'Dark Mode',
        languageLabel: 'Language',
        reportBugLabel: 'Report a Bug',

        // Welcome Email Notification
        welcomeEmailSubject: '🎉 New User on Sena!',
        welcomeEmailBody: 'A new user has started using Sena.\n\n- Device ID: {deviceId}\n- Language: {language}\n\n🌸',
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
        statusText: 'Mistral Conectado',
        listeningText: 'Escuchando...',
        footerTagline: 'Las respuestas de Sena utilizan Mistral por Orpheo Studio. 🌸',
        footerDisclaimer: 'Sena puede cometer errores. Verifica información importante.',
        inputPlaceholder: 'Escribe tu pregunta...',
        greeting: '¡Hola! Soy Sena. 🌸<br>Tecnología con alma gentil.<br><br>Llámame para lo que necesites. Aprendo contigo.',
        suggestions: [
            '¿Qué puedes hacer?',
            '¿Cómo descargo una app en el celular?',
            '¿Puedes explicarme los términos y políticas de Orpheo?',
            '¿Cómo donar a Orpheo Studio?'
        ],
        errorResponse: 'Disculpa, tuve un problema al procesar tu mensaje. ¿Podrías intentarlo de nuevo? 😔',

        // Features
        chatMode: 'Chat',
        liveMode: 'En Vivo',
        imageMode: 'Imagen',
        videoMode: 'Video',
        toolsMode: 'Herramientas',

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

        // Tools
        toolsTitle: 'Herramientas Útiles 🛠️',
        toolsDescription: 'Aquí tienes algunas herramientas sencillas para ayudarte en tu día a día.',
        qrCodeGeneratorTitle: 'Generador de Códigos QR',
        qrCodeGeneratorDescription: 'Crea un código QR para un enlace o texto.',
        qrCodeInputPlaceholder: 'Introduce el texto o la URL aquí',
        qrCodeGenerateButton: 'Generar Código QR',
        passwordGeneratorTitle: 'Generador de Contraseñas',
        passwordGeneratorDescription: 'Crea contraseñas fuertes y seguras.',
        passwordLength: 'Longitud:',
        passwordIncludeNumbers: 'Incluir números',
        passwordIncludeSymbols: 'Incluir símbolos',
        passwordGenerateButton: 'Generar Nueva Contraseña',
        passwordCopied: '¡Contraseña copiada!',
        appSettingsTitle: 'Configuración de la App',
        appSettingsDescription: 'Ajusta el idioma, la apariencia y reporta problemas.',
        darkModeLabel: 'Modo Oscuro',
        languageLabel: 'Idioma',
        reportBugLabel: 'Reportar un Error',

        // Welcome Email Notification
        welcomeEmailSubject: '🎉 ¡Nuevo Usuario en Sena!',
        welcomeEmailBody: 'Un nuevo usuario ha comenzado a usar Sena.\n\n- ID del Dispositivo: {deviceId}\n- Idioma: {language}\n\n🌸',
    }
};
