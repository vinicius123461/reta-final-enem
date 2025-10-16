"use client";

import { useState } from 'react';
import { 
  Brain, 
  BookOpen, 
  Calendar, 
  Clock, 
  Trophy, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Star,
  Download,
  Mail,
  User,
  Lock,
  CreditCard,
  Menu,
  X,
  Home,
  Settings,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react';

export default function RushIA() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [simuladoAtual, setSimuladoAtual] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resumoTema, setResumoTema] = useState('');
  const [resumoGerado, setResumoGerado] = useState('');
  const [resumoTipo, setResumoTipo] = useState('');
  const [plannerData, setPlannerData] = useState({
    tempoDisponivel: '',
    materiasPreferidas: '',
    dificuldades: '',
    horarioPreferido: '',
    metaEnem: '',
    experienciaAnterior: ''
  });
  const [cronogramaGerado, setCronogramaGerado] = useState(false);
  const [errosSimulado, setErrosSimulado] = useState<{questao: number, materia: string, assunto: string}[]>([]);
  
  // Estados para sistema de autenticação
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  });
  const [userPlan, setUserPlan] = useState(''); // 'individual' ou 'completo'
  const [isRegistering, setIsRegistering] = useState(false);

  // Base de questões expandida com 10 questões do ENEM
  const questoesSimulado = [
    {
      pergunta: "Qual foi o principal fator que levou à Proclamação da República no Brasil?",
      alternativas: [
        "A) Abolição da escravidão",
        "B) Crise do sistema monárquico e influência positivista",
        "C) Guerra do Paraguai",
        "D) Revolução Industrial",
        "E) Independência do Brasil"
      ],
      correta: 1,
      materia: "História",
      assunto: "República Brasileira"
    },
    {
      pergunta: "Em uma função quadrática f(x) = ax² + bx + c, se a > 0, a parábola:",
      alternativas: [
        "A) Tem concavidade voltada para baixo",
        "B) Tem concavidade voltada para cima",
        "C) É uma reta",
        "D) Não possui vértice",
        "E) Sempre passa pela origem"
      ],
      correta: 1,
      materia: "Matemática",
      assunto: "Funções Quadráticas"
    },
    {
      pergunta: "O processo de fotossíntese nas plantas é responsável por:",
      alternativas: [
        "A) Produzir apenas oxigênio",
        "B) Converter luz solar em energia química",
        "C) Absorver apenas gás carbônico",
        "D) Produzir apenas glicose",
        "E) Eliminar água das folhas"
      ],
      correta: 1,
      materia: "Biologia",
      assunto: "Fotossíntese"
    },
    {
      pergunta: "Na oração 'O livro que comprei é interessante', o termo 'que' é:",
      alternativas: [
        "A) Conjunção subordinativa",
        "B) Pronome relativo",
        "C) Pronome interrogativo",
        "D) Conjunção coordenativa",
        "E) Advérbio"
      ],
      correta: 1,
      materia: "Português",
      assunto: "Análise Sintática"
    },
    {
      pergunta: "O clima tropical no Brasil é caracterizado por:",
      alternativas: [
        "A) Temperaturas baixas o ano todo",
        "B) Duas estações bem definidas: seca e chuvosa",
        "C) Chuvas constantes durante todo o ano",
        "D) Ausência total de precipitação",
        "E) Temperaturas negativas no inverno"
      ],
      correta: 1,
      materia: "Geografia",
      assunto: "Climatologia"
    },
    {
      pergunta: "A Lei de Ohm estabelece que:",
      alternativas: [
        "A) V = R/I",
        "B) V = R × I",
        "C) I = V × R",
        "D) R = V × I",
        "E) V = I/R"
      ],
      correta: 1,
      materia: "Física",
      assunto: "Eletricidade"
    },
    {
      pergunta: "O elemento químico com símbolo 'Au' é:",
      alternativas: [
        "A) Prata",
        "B) Ouro",
        "C) Alumínio",
        "D) Argônio",
        "E) Arsênio"
      ],
      correta: 1,
      materia: "Química",
      assunto: "Tabela Periódica"
    },
    {
      pergunta: "A Revolução Industrial teve início em qual país?",
      alternativas: [
        "A) França",
        "B) Alemanha",
        "C) Inglaterra",
        "D) Estados Unidos",
        "E) Itália"
      ],
      correta: 2,
      materia: "História",
      assunto: "Revolução Industrial"
    },
    {
      pergunta: "O valor de x na equação 2x + 8 = 20 é:",
      alternativas: [
        "A) 4",
        "B) 6",
        "C) 8",
        "D) 10",
        "E) 12"
      ],
      correta: 1,
      materia: "Matemática",
      assunto: "Equações do 1º Grau"
    },
    {
      pergunta: "A mitose é um processo de divisão celular que resulta em:",
      alternativas: [
        "A) Quatro células diferentes",
        "B) Duas células idênticas",
        "C) Uma célula maior",
        "D) Células reprodutivas",
        "E) Morte celular"
      ],
      correta: 1,
      materia: "Biologia",
      assunto: "Divisão Celular"
    }
  ];

  const motivationalMessages = [
    "Bora virar o jogo! 🚀",
    "Você consegue! 💪",
    "Ainda dá tempo de conquistar o que quer! ⭐",
    "Continue assim! 🔥",
    "Mais um passo na direção certa! 🎯",
    "Você tá se superando! 🏆"
  ];

  const getRandomMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  };

  // Função para validar email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para validar senha
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  // Função para realizar cadastro
  const handleRegister = () => {
    if (!userData.nome.trim()) {
      alert('Por favor, digite seu nome completo.');
      return;
    }
    
    if (!isValidEmail(userData.email)) {
      alert('Por favor, digite um email válido.');
      return;
    }
    
    if (!isValidPassword(userData.senha)) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    if (userData.senha !== userData.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    // Simular cadastro (em produção, seria uma chamada para API)
    localStorage.setItem('rushia_user', JSON.stringify({
      nome: userData.nome,
      email: userData.email,
      senha: userData.senha, // Em produção, seria hash
      plano: userPlan,
      dataRegistro: new Date().toISOString()
    }));

    alert('Cadastro realizado com sucesso! Redirecionando para o pagamento...');
    setCurrentView('payment');
  };

  // Função para realizar login
  const handleLogin = () => {
    if (!isValidEmail(loginData.email)) {
      alert('Por favor, digite um email válido.');
      return;
    }
    
    if (!loginData.senha) {
      alert('Por favor, digite sua senha.');
      return;
    }

    // Simular verificação de login (em produção, seria uma chamada para API)
    const storedUser = localStorage.getItem('rushia_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === loginData.email && user.senha === loginData.senha) {
        setIsLoggedIn(true);
        setUserPlan(user.plano);
        setCurrentView('home');
        alert(`Bem-vindo de volta, ${user.nome}!`);
        return;
      }
    }
    
    alert('Email ou senha incorretos.');
  };

  // Função para logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPlan('');
    setCurrentView('home');
    setLoginData({ email: '', senha: '' });
  };

  // Função para gerar resumo dos erros
  const gerarResumoErros = () => {
    if (errosSimulado.length === 0) {
      return "Parabéns! Você não cometeu erros neste simulado. Continue assim! 🎉";
    }

    const materiaCount: {[key: string]: {count: number, assuntos: string[]}} = {};
    
    errosSimulado.forEach(erro => {
      if (!materiaCount[erro.materia]) {
        materiaCount[erro.materia] = { count: 0, assuntos: [] };
      }
      materiaCount[erro.materia].count++;
      if (!materiaCount[erro.materia].assuntos.includes(erro.assunto)) {
        materiaCount[erro.materia].assuntos.push(erro.assunto);
      }
    });

    let resumo = "📊 **ANÁLISE DOS SEUS ERROS**\n\n";
    resumo += "Com base no seu desempenho, identifiquei as áreas que precisam de mais atenção:\n\n";

    Object.entries(materiaCount)
      .sort(([,a], [,b]) => b.count - a.count)
      .forEach(([materia, data]) => {
        resumo += `🔴 **${materia}** (${data.count} erro${data.count > 1 ? 's' : ''})\n`;
        resumo += `   Assuntos para revisar: ${data.assuntos.join(', ')}\n\n`;
      });

    resumo += "💡 **RECOMENDAÇÕES:**\n";
    const materiaPrincipal = Object.entries(materiaCount).sort(([,a], [,b]) => b.count - a.count)[0];
    resumo += `• Priorize estudos em ${materiaPrincipal[0]} - foi onde você teve mais dificuldades\n`;
    resumo += `• Foque especialmente em: ${materiaPrincipal[1].assuntos.join(', ')}\n`;
    resumo += `• Refaça exercícios similares dessas matérias\n`;
    resumo += `• Use a sala de Resumos para revisar esses conteúdos\n\n`;
    resumo += "🎯 Lembre-se: cada erro é uma oportunidade de aprender e melhorar!";

    return resumo;
  };

  // App-style Header com navegação bottom
  const Header = () => (
    <header className="bg-white/95 backdrop-blur-md border-b border-[#E8F4FD] sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#87CEEB] to-[#4682B4] rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-[#2C3E50] font-inter">Rush.IA</span>
          </div>

          {/* Desktop Navigation - App Style */}
          <nav className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => setCurrentView('simulados')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentView === 'simulados' 
                      ? 'bg-[#87CEEB] text-white shadow-md' 
                      : 'text-[#4682B4] hover:bg-[#E8F4FD]'
                  }`}
                >
                  Simulados
                </button>
                <button 
                  onClick={() => setCurrentView('resumos')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentView === 'resumos' 
                      ? 'bg-[#87CEEB] text-white shadow-md' 
                      : 'text-[#4682B4] hover:bg-[#E8F4FD]'
                  }`}
                >
                  Resumos
                </button>
                <button 
                  onClick={() => setCurrentView('planejador')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentView === 'planejador' 
                      ? 'bg-[#87CEEB] text-white shadow-md' 
                      : 'text-[#4682B4] hover:bg-[#E8F4FD]'
                  }`}
                >
                  Planejador
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-[#6B7280] hover:text-[#2C3E50] hover:bg-[#F5F5DC] rounded-full transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button 
                onClick={() => setCurrentView('login')}
                className="bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300"
              >
                Entrar
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-[#E8F4FD] transition-colors"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );

  // App-style Bottom Navigation for Mobile
  const BottomNavigation = () => (
    isLoggedIn && (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E8F4FD] z-50">
        <div className="flex justify-around items-center py-2">
          <button 
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              currentView === 'home' 
                ? 'text-[#4682B4] bg-[#E8F4FD]' 
                : 'text-[#6B7280]'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Início</span>
          </button>
          <button 
            onClick={() => setCurrentView('simulados')}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              currentView === 'simulados' 
                ? 'text-[#4682B4] bg-[#E8F4FD]' 
                : 'text-[#6B7280]'
            }`}
          >
            <Brain className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Simulados</span>
          </button>
          <button 
            onClick={() => setCurrentView('resumos')}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              currentView === 'resumos' 
                ? 'text-[#4682B4] bg-[#E8F4FD]' 
                : 'text-[#6B7280]'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Resumos</span>
          </button>
          <button 
            onClick={() => setCurrentView('planejador')}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              currentView === 'planejador' 
                ? 'text-[#4682B4] bg-[#E8F4FD]' 
                : 'text-[#6B7280]'
            }`}
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Planejador</span>
          </button>
        </div>
      </div>
    )
  );

  const HomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - App Style */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#2C3E50] mb-4 font-inter">
              Rush.IA
            </h1>
            <p className="text-xl md:text-2xl text-[#4682B4] font-medium mb-4">
              Inteligência Artificial para turbinar seus estudos
            </p>
            <p className="text-lg text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
              A Rush.IA é sua assistente pessoal de estudos. Com tecnologia de ponta, 
              criamos simulados inteligentes, resumos personalizados e cronogramas 
              otimizados para maximizar seu aprendizado na reta final.
            </p>
          </div>

          {!isLoggedIn && (
            <div className="mb-12">
              <button 
                onClick={() => setCurrentView('register')}
                className="bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Começar Agora com Rush.IA
              </button>
              <p className="text-sm text-[#6B7280] mt-3">
                Escolha seu plano e transforme sua forma de estudar
              </p>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-[#E8F4FD]">
          <h2 className="text-3xl font-bold text-[#2C3E50] text-center mb-8">
            Por que escolher a Rush.IA?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#87CEEB] to-[#4682B4] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">IA Personalizada</h3>
              <p className="text-[#6B7280]">
                Algoritmos inteligentes que se adaptam ao seu ritmo e identificam 
                suas necessidades específicas de estudo.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#32CD32] to-[#228B22] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Foco no Resultado</h3>
              <p className="text-[#6B7280]">
                Cada funcionalidade foi desenvolvida para maximizar seu desempenho 
                e otimizar seu tempo de estudo.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Rapidez e Eficiência</h3>
              <p className="text-[#6B7280]">
                Respostas instantâneas, conteúdo gerado em segundos e 
                uma experiência fluida em qualquer dispositivo.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section - Destaque Principal */}
        <div className="bg-gradient-to-br from-[#87CEEB] to-[#4682B4] rounded-3xl p-8 text-white text-center mb-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha seu plano Rush.IA
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Acesso individual ou completo. Você decide como quer acelerar seus estudos!
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-3">Acesso Individual</h3>
              <div className="text-4xl font-bold mb-4">
                R$ 29,90
                <span className="text-lg font-normal opacity-80">/sala</span>
              </div>
              <ul className="text-left space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#FFD700] mr-3" />
                  <span>Acesso a uma sala por 30 dias</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#FFD700] mr-3" />
                  <span>Uso ilimitado da funcionalidade</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#FFD700] mr-3" />
                  <span>Suporte por email</span>
                </li>
              </ul>
              <button 
                onClick={() => {
                  setUserPlan('individual');
                  setCurrentView('register');
                }}
                className="w-full bg-white text-[#4682B4] py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors text-lg"
              >
                Escolher Sala Individual
              </button>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#FFD700] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FFD700] text-[#2C3E50] px-4 py-2 rounded-full text-sm font-bold">
                  MAIS POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Acesso Completo</h3>
              <div className="text-4xl font-bold mb-4">
                R$ 59,90
                <span className="text-lg font-normal opacity-80">/mês</span>
              </div>
              <ul className="text-left space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#FFD700] mr-3" />
                  <span>Acesso às 3 salas por 30 dias</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#FFD700] mr-3" />
                  <span>Uso ilimitado de todas as funcionalidades</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#FFD700] mr-3" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#FFD700] mr-3" />
                  <span>Relatórios de progresso detalhados</span>
                </li>
              </ul>
              <button 
                onClick={() => {
                  setUserPlan('completo');
                  setCurrentView('register');
                }}
                className="w-full bg-[#FFD700] text-[#2C3E50] py-4 rounded-2xl font-bold hover:bg-[#FFC700] transition-colors text-lg"
              >
                Começar Acesso Completo
              </button>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6">
          <div 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-[#E8F4FD]"
            onClick={() => isLoggedIn ? setCurrentView('simulados') : setCurrentView('register')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#87CEEB] to-[#4682B4] rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Simulados Inteligentes</h3>
            <p className="text-[#6B7280] mb-4 text-sm">
              IA gera simulados personalizados baseados nas provas anteriores do ENEM. 
              10 questões, feedback instantâneo e muito aprendizado!
            </p>
            <div className="flex items-center text-[#4682B4] font-semibold text-sm">
              <span>Experimentar agora</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>

          <div 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-[#E8F4FD]"
            onClick={() => isLoggedIn ? setCurrentView('resumos') : setCurrentView('register')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Resumos Turbo</h3>
            <p className="text-[#6B7280] mb-4 text-sm">
              Digite qualquer tema e receba um resumo inteligente, direto ao ponto. 
              Sua "cola" personalizada para revisar rapidinho!
            </p>
            <div className="flex items-center text-[#4682B4] font-semibold text-sm">
              <span>Criar resumo</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>

          <div 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-[#E8F4FD]"
            onClick={() => isLoggedIn ? setCurrentView('planejador') : setCurrentView('register')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#32CD32] to-[#228B22] rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Planejador Relâmpago</h3>
            <p className="text-[#6B7280] mb-4 text-sm">
              6 perguntas rápidas e a IA monta seu cronograma de 40 dias. 
              Equilibrado, realista e focado no que realmente importa!
            </p>
            <div className="flex items-center text-[#4682B4] font-semibold text-sm">
              <span>Criar plano</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RegisterView = () => (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] flex items-center justify-center px-4 pb-20 md:pb-0">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl max-w-md w-full border border-[#E8F4FD]">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-[#87CEEB] to-[#4682B4] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-2">Criar Conta Rush.IA</h2>
          <p className="text-[#6B7280] text-sm">
            {userPlan === 'individual' ? 'Plano Individual selecionado' : 'Plano Completo selecionado'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Nome Completo *</label>
            <input 
              type="text"
              value={userData.nome}
              onChange={(e) => setUserData({...userData, nome: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
              placeholder="Seu nome completo"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Email *</label>
            <input 
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Senha *</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={userData.senha}
                onChange={(e) => setUserData({...userData, senha: e.target.value})}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
                placeholder="Mínimo 6 caracteres"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-[#2C3E50]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Confirmar Senha *</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                value={userData.confirmarSenha}
                onChange={(e) => setUserData({...userData, confirmarSenha: e.target.value})}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
                placeholder="Digite a senha novamente"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-[#2C3E50]"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Criar Conta e Continuar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#6B7280] mb-3">
            Já tem uma conta?
          </p>
          <button 
            onClick={() => setCurrentView('login')}
            className="text-[#4682B4] font-semibold text-sm hover:underline"
          >
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );

  const LoginView = () => (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] flex items-center justify-center px-4 pb-20 md:pb-0">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl max-w-md w-full border border-[#E8F4FD]">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-[#87CEEB] to-[#4682B4] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-2">Bem-vindo de volta!</h2>
          <p className="text-[#6B7280] text-sm">Entre com suas credenciais</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Email</label>
            <input 
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Senha</label>
            <input 
              type="password"
              value={loginData.senha}
              onChange={(e) => setLoginData({...loginData, senha: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Entrar na Rush.IA
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#6B7280] mb-3">
            Ainda não tem acesso? Escolha seu plano:
          </p>
          <button 
            onClick={() => setCurrentView('register')}
            className="text-[#4682B4] font-semibold text-sm hover:underline"
          >
            Criar Conta Rush.IA
          </button>
        </div>
      </div>
    </div>
  );

  const SimuladosView = () => {
    if (showResult) {
      const acertos = respostas.filter((resp, idx) => resp === questoesSimulado[idx]?.correta).length;
      const porcentagem = Math.round((acertos / questoesSimulado.length) * 100);
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] py-8 pb-24 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-[#E8F4FD] text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#32CD32] to-[#228B22] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-4">
                Simulado Concluído!
              </h2>
              
              <div className="bg-gradient-to-r from-[#E8F4FD] to-[#F0F8FF] rounded-2xl p-4 mb-6">
                <div className="text-4xl font-bold text-[#4682B4] mb-2">{porcentagem}%</div>
                <p className="text-base text-[#6B7280]">
                  Você acertou {acertos} de {questoesSimulado.length} questões
                </p>
                <p className="text-sm text-[#6B7280] mt-1">
                  Tempo médio por questão: 2min 30s
                </p>
              </div>

              <div className="bg-[#F0F8FF] rounded-2xl p-4 mb-6">
                <h3 className="text-lg font-bold text-[#2C3E50] mb-3">Áreas para reforçar:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {errosSimulado.map((erro, idx) => (
                    <span key={idx} className="bg-[#FFE4B5] text-[#8B4513] px-3 py-1 rounded-full text-sm">
                      {erro.assunto}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-4 mb-6 text-white">
                <h3 className="text-lg font-bold mb-2">🎉 {getRandomMessage()}</h3>
                <p className="text-sm">Você está melhorando a cada tentativa!</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => {
                    setShowResult(false);
                    setSimuladoAtual(0);
                    setRespostas([]);
                    setErrosSimulado([]);
                  }}
                  className="bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Gerar Novo Simulado
                </button>
                <button 
                  onClick={() => {
                    const resumo = gerarResumoErros();
                    alert(resumo); // Em uma implementação real, isso seria um modal ou nova tela
                  }}
                  className="bg-[#F5F5DC] text-[#2C3E50] px-6 py-3 rounded-2xl font-semibold hover:bg-[#E6E6D3] transition-colors"
                >
                  Gerar Resumo dos Meus Erros
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (simuladoAtual < questoesSimulado.length) {
      const questao = questoesSimulado[simuladoAtual];
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] py-8 pb-24 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-[#E8F4FD]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#87CEEB] to-[#4682B4] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{simuladoAtual + 1}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2C3E50]">Simulado Inteligente</h2>
                    <p className="text-[#6B7280] text-sm">Questão {simuladoAtual + 1} de {questoesSimulado.length}</p>
                  </div>
                </div>
                <div className="flex items-center text-[#4682B4]">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-semibold text-sm">05:00</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="bg-[#E8F4FD] rounded-xl h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-[#87CEEB] to-[#4682B4] h-2 rounded-xl transition-all duration-300"
                    style={{ width: `${((simuladoAtual + 1) / questoesSimulado.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-lg font-semibold text-[#2C3E50] mb-4 leading-relaxed">
                  {questao.pergunta}
                </h3>

                <div className="space-y-3">
                  {questao.alternativas.map((alt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const novasRespostas = [...respostas];
                        novasRespostas[simuladoAtual] = idx;
                        setRespostas(novasRespostas);
                      }}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-sm ${
                        respostas[simuladoAtual] === idx
                          ? 'border-[#87CEEB] bg-[#E8F4FD] text-[#2C3E50]'
                          : 'border-[#E8F4FD] hover:border-[#87CEEB] hover:bg-[#F8FFFE]'
                      }`}
                    >
                      {alt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button 
                  onClick={() => setCurrentView('home')}
                  className="text-[#6B7280] hover:text-[#2C3E50] transition-colors text-sm"
                >
                  Voltar ao início
                </button>
                <button 
                  onClick={() => {
                    // Registrar erro se resposta incorreta
                    if (respostas[simuladoAtual] !== questao.correta) {
                      setErrosSimulado(prev => [...prev, {
                        questao: simuladoAtual,
                        materia: questao.materia,
                        assunto: questao.assunto
                      }]);
                    }

                    if (simuladoAtual === questoesSimulado.length - 1) {
                      setShowResult(true);
                    } else {
                      setSimuladoAtual(simuladoAtual + 1);
                    }
                  }}
                  disabled={respostas[simuladoAtual] === undefined}
                  className="bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {simuladoAtual === questoesSimulado.length - 1 ? 'Finalizar' : 'Próxima'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-[#E8F4FD] text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#87CEEB] to-[#4682B4] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-4">
              Simulados Inteligentes
            </h2>
            <p className="text-base text-[#6B7280] mb-6 max-w-2xl mx-auto">
              Nossa IA gera simulados personalizados baseados nas provas anteriores do ENEM. 
              Cada simulado tem 10 questões cuidadosamente selecionadas para seu nível!
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#E8F4FD] rounded-2xl p-4">
                <Target className="w-6 h-6 text-[#4682B4] mx-auto mb-2" />
                <h3 className="font-bold text-[#2C3E50] mb-1 text-sm">Questões Inteligentes</h3>
                <p className="text-xs text-[#6B7280]">IA seleciona questões do seu nível</p>
              </div>
              <div className="bg-[#E8F4FD] rounded-2xl p-4">
                <Clock className="w-6 h-6 text-[#4682B4] mx-auto mb-2" />
                <h3 className="font-bold text-[#2C3E50] mb-1 text-sm">Tempo Controlado</h3>
                <p className="text-xs text-[#6B7280]">Cronômetro opcional para treinar</p>
              </div>
              <div className="bg-[#E8F4FD] rounded-2xl p-4">
                <Star className="w-6 h-6 text-[#4682B4] mx-auto mb-2" />
                <h3 className="font-bold text-[#2C3E50] mb-1 text-sm">Feedback Detalhado</h3>
                <p className="text-xs text-[#6B7280]">Análise completa do seu desempenho</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-4 mb-6 text-white">
              <h3 className="text-lg font-bold mb-2">🚀 Bora começar!</h3>
              <p className="text-sm">Cada simulado é uma oportunidade de crescer. Você consegue!</p>
            </div>

            <button 
              onClick={() => {
                setSimuladoAtual(0);
                setRespostas([]);
                setShowResult(false);
                setErrosSimulado([]);
              }}
              className="bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Começar Simulado Agora
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ResumosView = () => {
    const gerarResumo = (tipo: string) => {
      if (!resumoTema.trim()) return;

      let conteudo = '';
      
      if (tipo === 'turbo') {
        conteudo = `
**${resumoTema}**

• **Conceito Principal**: Definição básica e importância
• **Características**: Principais aspectos e propriedades  
• **Aplicações**: Onde é usado e como funciona
• **Dicas para o ENEM**: Pontos que mais caem na prova
        `;
      } else if (tipo === 'medio') {
        conteudo = `
**${resumoTema} - Resumo Médio**

**Introdução**
Este tema é fundamental para o ENEM e aparece frequentemente nas provas. Compreender seus conceitos básicos é essencial para um bom desempenho.

**Conceitos Fundamentais**
• Definição detalhada do tema principal
• Origem histórica e desenvolvimento
• Principais características e propriedades
• Relação com outros temas importantes

**Aspectos Importantes**
• Como o tema se manifesta na prática
• Exemplos concretos e aplicações reais
• Variações e tipos diferentes
• Fatores que influenciam o tema

**Conexões com o ENEM**
• Tipos de questões mais comuns
• Palavras-chave que aparecem nas provas
• Relação com outras matérias
• Dicas de resolução e estratégias

**Pontos de Atenção**
• Erros mais comuns dos estudantes
• Pegadinhas frequentes nas questões
• Como identificar o tema nas questões
        `;
      } else if (tipo === 'composto') {
        conteudo = `
**${resumoTema} - Resumo Completo e Detalhado**

**Contextualização Histórica e Teórica**

O tema ${resumoTema} representa um dos pilares fundamentais do conhecimento exigido no ENEM, estabelecendo conexões profundas com diversas áreas do saber. Sua compreensão adequada não apenas facilita a resolução de questões específicas, mas também desenvolve o raciocínio crítico necessário para análises interdisciplinares.

Historicamente, este conceito evoluiu através de diferentes períodos, sendo moldado por descobertas científicas, transformações sociais e avanços tecnológicos. Compreender essa evolução temporal permite ao estudante contextualizar melhor as questões e identificar padrões recorrentes nas avaliações.

**Fundamentos Teóricos e Conceituais**

Os princípios básicos que regem este tema podem ser organizados em diferentes categorias, cada uma contribuindo para uma visão holística do assunto. A primeira categoria engloba os aspectos teóricos fundamentais, que estabelecem as bases conceituais necessárias para compreensões mais avançadas.

A segunda categoria aborda as aplicações práticas, demonstrando como os conceitos teóricos se manifestam em situações reais. Esta conexão entre teoria e prática é especialmente valorizada no ENEM, que busca avaliar a capacidade do estudante de aplicar conhecimentos em contextos diversos.

A terceira categoria explora as interconexões com outras áreas do conhecimento, evidenciando a natureza interdisciplinar do tema. Essas conexões são fundamentais para resolver questões que exigem síntese de conhecimentos de diferentes disciplinas.

**Metodologias de Análise e Resolução**

Para dominar completamente este tema, é essencial desenvolver metodologias sistemáticas de análise. O primeiro passo consiste na identificação precisa dos elementos-chave presentes em cada situação-problema. Esta identificação requer conhecimento sólido dos conceitos fundamentais e capacidade de reconhecer suas manifestações em diferentes contextos.

O segundo passo envolve a aplicação de estratégias de resolução específicas, adaptadas às características particulares de cada tipo de questão. Estas estratégias devem ser praticadas regularmente para se tornarem automáticas durante a prova.

O terceiro passo compreende a verificação e validação dos resultados obtidos, garantindo coerência lógica e adequação ao contexto apresentado.

**Aplicações no Contexto do ENEM**

As questões relacionadas a este tema no ENEM apresentam características específicas que devem ser compreendidas para otimizar o desempenho. Geralmente, essas questões integram conhecimentos de múltiplas áreas, exigindo capacidade de síntese e análise crítica.

Os enunciados frequentemente apresentam situações-problema contextualizadas, conectando o tema a realidades sociais, ambientais, tecnológicas ou culturais contemporâneas. Esta abordagem reflete a filosofia do ENEM de avaliar competências e habilidades aplicáveis à vida real.

As alternativas de resposta são cuidadosamente elaboradas para testar diferentes níveis de compreensão, desde o conhecimento básico dos conceitos até a capacidade de aplicação em situações complexas e inéditas.

**Estratégias de Estudo e Memorização**

Para otimizar o aprendizado deste tema, recomenda-se uma abordagem multifacetada que combine diferentes técnicas de estudo. A leitura ativa de textos especializados deve ser complementada pela resolução sistemática de exercícios práticos, permitindo a consolidação dos conhecimentos teóricos através da aplicação.

A elaboração de mapas conceituais e esquemas visuais facilita a compreensão das relações entre diferentes aspectos do tema, criando uma estrutura mental organizada que pode ser rapidamente acessada durante a prova.

A discussão do tema com colegas e professores proporciona diferentes perspectivas e esclarece dúvidas que podem não ter sido identificadas durante o estudo individual.

**Conexões Interdisciplinares e Contextualização**

Este tema estabelece conexões significativas com diversas outras áreas do conhecimento, criando uma rede conceitual rica e complexa. Compreender essas conexões é fundamental para resolver questões interdisciplinares e desenvolver uma visão integrada do conhecimento.

As conexões podem ser diretas, quando conceitos de diferentes áreas se complementam na explicação de um fenômeno, ou indiretas, quando metodologias ou princípios de uma área podem ser aplicados em outra.

**Considerações Finais e Perspectivas**

O domínio completo deste tema requer dedicação, prática sistemática e compreensão profunda dos conceitos envolvidos. Mais do que memorizar informações, é necessário desenvolver a capacidade de aplicar conhecimentos em situações novas e complexas.

A preparação adequada para questões relacionadas a este tema no ENEM deve incluir não apenas o estudo dos conceitos fundamentais, mas também a prática regular de resolução de questões, a análise de provas anteriores e a busca por conexões com temas de atualidade.

O sucesso na abordagem deste tema contribui significativamente para o desempenho geral no ENEM, uma vez que demonstra capacidade de raciocínio crítico, síntese de conhecimentos e aplicação prática de conceitos teóricos.
        `;
      }

      setResumoGerado(conteudo);
      setResumoTipo(tipo);
    };

    if (resumoGerado) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] py-8 pb-24 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-[#E8F4FD]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2C3E50]">
                      Resumo {resumoTipo === 'turbo' ? 'Turbo' : resumoTipo === 'medio' ? 'Médio' : 'Composto'}
                    </h2>
                    <p className="text-[#6B7280] text-sm">Tema: {resumoTema}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-[#4682B4] hover:bg-[#E8F4FD] rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-[#F8FFFE] rounded-2xl p-4 mb-6 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-[#2C3E50] leading-relaxed text-sm font-sans">
                    {resumoGerado}
                  </pre>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#32CD32] to-[#228B22] rounded-2xl p-4 mb-6 text-white text-center">
                <h3 className="text-lg font-bold mb-2">🎉 Agora esse assunto tá dominado!</h3>
                <p className="text-sm">Mais um tema que você vai arrasar na prova!</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => {
                    setResumoGerado('');
                    setResumoTema('');
                    setResumoTipo('');
                  }}
                  className="bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Criar Novo Resumo
                </button>
                <button className="bg-[#F5F5DC] text-[#2C3E50] px-6 py-3 rounded-2xl font-semibold hover:bg-[#E6E6D3] transition-colors flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Salvar PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-[#E8F4FD]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-4">
                Resumos Inteligentes
              </h2>
              <p className="text-base text-[#6B7280] mb-6 max-w-2xl mx-auto">
                Digite qualquer tema e nossa IA cria resumos personalizados. 
                Escolha entre 3 níveis de detalhamento para otimizar seu estudo!
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-6">
              <label className="block text-sm font-medium text-[#2C3E50] mb-3">
                Qual tema você quer dominar hoje?
              </label>
              <div className="mb-4">
                <input 
                  type="text"
                  value={resumoTema}
                  onChange={(e) => setResumoTema(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
                  placeholder="Ex: Revolução Francesa, Funções Quadráticas, Genética..."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-3 mb-4">
                <button 
                  onClick={() => gerarResumo('turbo')}
                  disabled={!resumoTema.trim()}
                  className="bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  📝 Resumo Turbo
                  <div className="text-xs opacity-80 mt-1">Rápido e direto</div>
                </button>
                <button 
                  onClick={() => gerarResumo('medio')}
                  disabled={!resumoTema.trim()}
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  📚 Resumo Médio
                  <div className="text-xs opacity-80 mt-1">25% mais completo</div>
                </button>
                <button 
                  onClick={() => gerarResumo('composto')}
                  disabled={!resumoTema.trim()}
                  className="bg-gradient-to-r from-[#32CD32] to-[#228B22] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  📖 Resumo Composto
                  <div className="text-xs opacity-80 mt-1">75% mais detalhado</div>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#E8F4FD] rounded-2xl p-4 text-center">
                <BookOpen className="w-6 h-6 text-[#4682B4] mx-auto mb-2" />
                <h3 className="font-bold text-[#2C3E50] mb-1 text-sm">Conteúdo Inteligente</h3>
                <p className="text-xs text-[#6B7280]">IA organiza as informações mais importantes</p>
              </div>
              <div className="bg-[#E8F4FD] rounded-2xl p-4 text-center">
                <Target className="w-6 h-6 text-[#4682B4] mx-auto mb-2" />
                <h3 className="font-bold text-[#2C3E50] mb-1 text-sm">Foco no ENEM</h3>
                <p className="text-xs text-[#6B7280]">Baseado nos assuntos que mais caem</p>
              </div>
              <div className="bg-[#E8F4FD] rounded-2xl p-4 text-center">
                <Download className="w-6 h-6 text-[#4682B4] mx-auto mb-2" />
                <h3 className="font-bold text-[#2C3E50] mb-1 text-sm">Salve e Leve</h3>
                <p className="text-xs text-[#6B7280]">Exporte em PDF para estudar offline</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-4 text-white text-center">
              <h3 className="text-lg font-bold mb-2">💡 Dica de ouro!</h3>
              <p className="text-sm">Seja específico no tema. Quanto mais detalhado, melhor o resumo!</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PlanejadorView = () => {
    if (cronogramaGerado) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] py-8 pb-24 md:pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-[#E8F4FD]">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#32CD32] to-[#228B22] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-4">
                  Seu Cronograma Personalizado de 40 Dias
                </h2>
                <p className="text-base text-[#6B7280]">
                  Planejamento otimizado baseado no seu perfil e focado no ENEM 2024
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6].map((semana) => (
                  <div key={semana} className="bg-[#F8FFFE] rounded-2xl p-3">
                    <h3 className="font-bold text-[#4682B4] mb-2 text-sm">Semana {semana}</h3>
                    <div className="space-y-1 text-xs">
                      <div className="bg-[#E8F4FD] rounded-lg p-2">
                        <span className="font-medium">Seg:</span> Matemática - Funções
                      </div>
                      <div className="bg-[#FFE4B5] rounded-lg p-2">
                        <span className="font-medium">Ter:</span> História - República
                      </div>
                      <div className="bg-[#E8F4FD] rounded-lg p-2">
                        <span className="font-medium">Qua:</span> Português - Interpretação
                      </div>
                      <div className="bg-[#FFE4B5] rounded-lg p-2">
                        <span className="font-medium">Qui:</span> Ciências - Ecologia
                      </div>
                      <div className="bg-[#E8F4FD] rounded-lg p-2">
                        <span className="font-medium">Sex:</span> Geografia - Clima
                      </div>
                      <div className="bg-[#F0F8FF] rounded-lg p-2">
                        <span className="font-medium">Sáb:</span> Revisão Geral
                      </div>
                      <div className="bg-[#F5F5DC] rounded-lg p-2">
                        <span className="font-medium">Dom:</span> Descanso/Redação
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#F0F8FF] rounded-2xl p-4 mb-6">
                <h3 className="text-lg font-bold text-[#2C3E50] mb-3">📊 Seu Perfil de Estudo:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-[#4682B4]">Tempo Disponível:</span>
                    <p className="text-[#6B7280]">{plannerData.tempoDisponivel}</p>
                  </div>
                  <div>
                    <span className="font-medium text-[#4682B4]">Matérias Preferidas:</span>
                    <p className="text-[#6B7280]">{plannerData.materiasPreferidas}</p>
                  </div>
                  <div>
                    <span className="font-medium text-[#4682B4]">Foco Principal:</span>
                    <p className="text-[#6B7280]">Superar dificuldades em {plannerData.dificuldades}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#32CD32] to-[#228B22] rounded-2xl p-4 mb-6 text-white text-center">
                <h3 className="text-lg font-bold mb-2">🎯 Planejamento pronto!</h3>
                <p className="text-sm">Cronograma otimizado para o ENEM 2024 — você tá no caminho certo!</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                  Salvar Cronograma
                </button>
                <button className="bg-[#F5F5DC] text-[#2C3E50] px-6 py-3 rounded-2xl font-semibold hover:bg-[#E6E6D3] transition-colors flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Receber Lembretes
                </button>
                <button 
                  onClick={() => setCronogramaGerado(false)}
                  className="text-[#6B7280] hover:text-[#2C3E50] transition-colors text-sm"
                >
                  Criar Novo Plano
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-[#E8F4FD]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#32CD32] to-[#228B22] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-4">
                Planejador Relâmpago
              </h2>
              <p className="text-base text-[#6B7280] mb-6 max-w-2xl mx-auto">
                Responda algumas perguntas e nossa IA monta seu cronograma personalizado de 40 dias. 
                Otimizado para o ENEM 2024 e baseado no seu perfil único!
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  1. Quanto tempo você tem disponível por dia para estudar?
                </label>
                <select 
                  value={plannerData.tempoDisponivel}
                  onChange={(e) => setPlannerData({...plannerData, tempoDisponivel: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="1-2h">1-2 horas</option>
                  <option value="3-4h">3-4 horas</option>
                  <option value="5-6h">5-6 horas</option>
                  <option value="7-8h">7-8 horas</option>
                  <option value="8h+">Mais de 8 horas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  2. Qual seu horário preferido para estudar?
                </label>
                <select 
                  value={plannerData.horarioPreferido}
                  onChange={(e) => setPlannerData({...plannerData, horarioPreferido: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="manha">Manhã (6h-12h)</option>
                  <option value="tarde">Tarde (12h-18h)</option>
                  <option value="noite">Noite (18h-22h)</option>
                  <option value="madrugada">Madrugada (22h-6h)</option>
                  <option value="flexivel">Horário flexível</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  3. Qual sua meta no ENEM?
                </label>
                <select 
                  value={plannerData.metaEnem}
                  onChange={(e) => setPlannerData({...plannerData, metaEnem: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="500-600">500-600 pontos</option>
                  <option value="600-700">600-700 pontos</option>
                  <option value="700-800">700-800 pontos</option>
                  <option value="800+">Mais de 800 pontos</option>
                  <option value="medicina">Medicina/Cursos concorridos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  4. Quais são suas matérias preferidas?
                </label>
                <input 
                  type="text"
                  value={plannerData.materiasPreferidas}
                  onChange={(e) => setPlannerData({...plannerData, materiasPreferidas: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
                  placeholder="Ex: Matemática, História, Português..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  5. Quais são suas maiores dificuldades?
                </label>
                <textarea 
                  value={plannerData.dificuldades}
                  onChange={(e) => setPlannerData({...plannerData, dificuldades: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors h-20 resize-none"
                  placeholder="Ex: Física, Redação, Interpretação de texto..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  6. Qual sua experiência com o ENEM?
                </label>
                <select 
                  value={plannerData.experienciaAnterior}
                  onChange={(e) => setPlannerData({...plannerData, experienciaAnterior: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="primeira-vez">Primeira vez</option>
                  <option value="segunda-vez">Segunda tentativa</option>
                  <option value="veterano">Veterano (3+ tentativas)</option>
                  <option value="treineiro">Já fiz como treineiro</option>
                </select>
              </div>
            </div>

            <div className="text-center mb-6">
              <button 
                onClick={() => {
                  const camposObrigatorios = [
                    plannerData.tempoDisponivel,
                    plannerData.horarioPreferido,
                    plannerData.metaEnem,
                    plannerData.materiasPreferidas,
                    plannerData.dificuldades,
                    plannerData.experienciaAnterior
                  ];
                  
                  if (camposObrigatorios.every(campo => campo.trim())) {
                    setCronogramaGerado(true);
                  }
                }}
                disabled={!plannerData.tempoDisponivel || !plannerData.horarioPreferido || !plannerData.metaEnem || !plannerData.materiasPreferidas || !plannerData.dificuldades || !plannerData.experienciaAnterior}
                className="bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Gerar Meu Cronograma Personalizado
              </button>
            </div>

            <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-4 text-white text-center">
              <h3 className="text-lg font-bold mb-2">⚡ Inteligência personalizada!</h3>
              <p className="text-sm">Quanto mais detalhes você fornecer, mais preciso será seu cronograma!</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaymentView = () => (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FFFE] to-[#E8F4FD] py-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-[#E8F4FD]">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-4">
              Finalizar Assinatura Rush.IA
            </h2>
            <p className="text-base text-[#6B7280]">
              {userPlan === 'individual' ? 'Plano Individual selecionado' : 'Plano Completo selecionado'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className={`rounded-2xl p-6 shadow-lg border-2 ${
              userPlan === 'individual' 
                ? 'bg-gradient-to-br from-[#87CEEB] to-[#4682B4] text-white border-[#4682B4]' 
                : 'bg-white border-[#E8F4FD]'
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${userPlan === 'individual' ? 'text-white' : 'text-[#2C3E50]'}`}>
                Acesso Individual
              </h3>
              <div className={`text-3xl font-bold mb-4 ${userPlan === 'individual' ? 'text-white' : 'text-[#4682B4]'}`}>
                R$ 29,90
                <span className={`text-base font-normal ${userPlan === 'individual' ? 'text-white opacity-80' : 'text-[#6B7280]'}`}>
                  /sala
                </span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center">
                  <CheckCircle className={`w-4 h-4 mr-2 ${userPlan === 'individual' ? 'text-[#FFD700]' : 'text-[#32CD32]'}`} />
                  <span>Acesso a uma sala por 30 dias</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className={`w-4 h-4 mr-2 ${userPlan === 'individual' ? 'text-[#FFD700]' : 'text-[#32CD32]'}`} />
                  <span>Uso ilimitado da funcionalidade</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className={`w-4 h-4 mr-2 ${userPlan === 'individual' ? 'text-[#FFD700]' : 'text-[#32CD32]'}`} />
                  <span>Suporte por email</span>
                </li>
              </ul>
              {userPlan !== 'individual' && (
                <button 
                  onClick={() => setUserPlan('individual')}
                  className="w-full bg-[#F5F5DC] text-[#2C3E50] py-3 rounded-2xl font-semibold hover:bg-[#E6E6D3] transition-colors"
                >
                  Selecionar Individual
                </button>
              )}
            </div>

            <div className={`rounded-2xl p-6 shadow-xl relative ${
              userPlan === 'completo' 
                ? 'bg-gradient-to-br from-[#87CEEB] to-[#4682B4] text-white border-2 border-[#FFD700]' 
                : 'bg-white border-2 border-[#E8F4FD]'
            }`}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FFD700] text-[#2C3E50] px-3 py-1 rounded-full text-xs font-bold">
                  RECOMENDADO
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${userPlan === 'completo' ? 'text-white' : 'text-[#2C3E50]'}`}>
                Acesso Completo
              </h3>
              <div className={`text-3xl font-bold mb-4 ${userPlan === 'completo' ? 'text-white' : 'text-[#4682B4]'}`}>
                R$ 59,90
                <span className={`text-base font-normal ${userPlan === 'completo' ? 'text-white opacity-80' : 'text-[#6B7280]'}`}>
                  /mês
                </span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center">
                  <CheckCircle className={`w-4 h-4 mr-2 ${userPlan === 'completo' ? 'text-[#FFD700]' : 'text-[#32CD32]'}`} />
                  <span>Acesso às 3 salas por 30 dias</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className={`w-4 h-4 mr-2 ${userPlan === 'completo' ? 'text-[#FFD700]' : 'text-[#32CD32]'}`} />
                  <span>Uso ilimitado de tudo</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className={`w-4 h-4 mr-2 ${userPlan === 'completo' ? 'text-[#FFD700]' : 'text-[#32CD32]'}`} />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className={`w-4 h-4 mr-2 ${userPlan === 'completo' ? 'text-[#FFD700]' : 'text-[#32CD32]'}`} />
                  <span>Relatórios de progresso</span>
                </li>
              </ul>
              {userPlan !== 'completo' && (
                <button 
                  onClick={() => setUserPlan('completo')}
                  className="w-full bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Selecionar Completo
                </button>
              )}
            </div>
          </div>

          <div className="text-center mb-6">
            <button 
              onClick={() => {
                const paymentUrl = userPlan === 'individual' 
                  ? 'https://pay.cakto.com.br/34ydmtc_604917'
                  : 'https://pay.cakto.com.br/34rcs4r_604884';
                
                // Simular pagamento bem-sucedido após redirecionamento
                setTimeout(() => {
                  setIsLoggedIn(true);
                  setCurrentView('home');
                  alert('Pagamento confirmado! Bem-vindo à Rush.IA!');
                }, 2000);
                
                window.open(paymentUrl, '_blank');
              }}
              className="bg-gradient-to-r from-[#32CD32] to-[#228B22] text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Finalizar Pagamento - {userPlan === 'individual' ? 'R$ 29,90' : 'R$ 59,90'}
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#32CD32] to-[#228B22] rounded-2xl p-4 text-white text-center">
            <h3 className="text-lg font-bold mb-2">🎉 Você está a um clique do sucesso!</h3>
            <p className="text-sm">Após o pagamento, você terá acesso imediato à plataforma Rush.IA!</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-[#2C3E50] text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-[#87CEEB] to-[#4682B4] rounded-lg flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">Rush.IA</span>
            </div>
            <p className="text-gray-300 text-sm">
              Inteligência Artificial para turbinar seus estudos na reta final.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-sm">Produto</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Simulados</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resumos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Planejador</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-sm">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-6 pt-6 text-center text-sm text-gray-300">
          <p>&copy; 2024 Rush.IA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      
      {currentView === 'home' && <HomeView />}
      {currentView === 'register' && <RegisterView />}
      {currentView === 'login' && <LoginView />}
      {currentView === 'simulados' && <SimuladosView />}
      {currentView === 'resumos' && <ResumosView />}
      {currentView === 'planejador' && <PlanejadorView />}
      {currentView === 'payment' && <PaymentView />}
      
      <BottomNavigation />
      <Footer />
    </div>
  );
}