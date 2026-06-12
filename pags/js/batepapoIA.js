/**
 * ═══════════════════════════════════════════════════════════
 * SOSBrasil - Bate-Papo / IA
 * ═══════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─────────────────────────────────────────────────────────
  // CHAT IA
  // ─────────────────────────────────────────────────────────

  class ChatIA {
    constructor() {
      this.textarea = document.querySelector('.chat-textarea');
      this.btnEnviar = document.querySelector('.chat-btn-enviar');
      this.containerMensagens = document.querySelector('.chat-mensagens');
      this.conversas = [];
      this.conversaAtual = 0;

      // Respostas padrão da IA (simulado)
      this.respostas = {
        padrao: 'Obrigado pela sua pergunta! Como posso ajudá-lo melhor?',
        horario: 'Nosso horário de funcionamento é de segunda a sexta, das 8h às 18h.',
        doacao: 'Para fazer uma doação, acesse a página "Banco Digital" e escolha sua forma de contribuição.',
        cadastro: 'Para se cadastrar, clique em "Cadastre-se" na página inicial e preencha seus dados.',
        voluntario: 'Ótimo! Visite a página "Ajuda" para conhecer as formas de se tornar voluntário.',
        denuncia: 'Você pode registrar uma denúncia no botão de denúncia na página "Ajuda".',
        privacidade: 'Sua privacidade é importante para nós. Consulte nossa política de privacidade para mais detalhes.'
      };

      this.inicializar();
    }

    inicializar() {
      if (this.btnEnviar) {
        this.btnEnviar.addEventListener('click', () => this.enviarMensagem());
      }

      if (this.textarea) {
        this.textarea.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.enviarMensagem();
          }
        });

        // Auto-resize do textarea
        this.textarea.addEventListener('input', () => {
          this.textarea.style.height = 'auto';
          this.textarea.style.height = Math.min(this.textarea.scrollHeight, 120) + 'px';
        });
      }
    }

    enviarMensagem() {
      const texto = this.textarea?.value.trim();

      if (!texto) {
        SOS.mostrarMensagem('Digite uma mensagem', 'erro');
        return;
      }

      // Adicionar mensagem do usuário
      this.adicionarMensagem(texto, 'enviada');

      // Simular digitação da IA
      setTimeout(() => {
        const resposta = this.gerarResposta(texto);
        this.adicionarMensagem(resposta, 'recebida');
      }, 800);

      // Limpar textarea
      if (this.textarea) {
        this.textarea.value = '';
        this.textarea.style.height = 'auto';
      }
    }

    adicionarMensagem(texto, tipo) {
      if (!this.containerMensagens) return;

      const bolha = document.createElement('div');
      bolha.className = `bolha bolha-${tipo}`;

      if (tipo === 'enviada') {
        bolha.innerHTML = `<p>${this.escaparHTML(texto)}</p>`;
      } else {
        bolha.innerHTML = `<strong>Assistente</strong><p>${this.escaparHTML(texto)}</p>`;
      }

      bolha.style.animation = 'fadeIn 0.3s ease-out';
      this.containerMensagens.appendChild(bolha);

      // Scroll para a última mensagem
      setTimeout(() => {
        this.containerMensagens.scrollTop = this.containerMensagens.scrollHeight;
      }, 100);
    }

    gerarResposta(pergunta) {
      const perguntaBaixa = pergunta.toLowerCase();

      if (perguntaBaixa.includes('horário') || perguntaBaixa.includes('funciona')) {
        return this.respostas.horario;
      } else if (perguntaBaixa.includes('doação') || perguntaBaixa.includes('doar')) {
        return this.respostas.doacao;
      } else if (perguntaBaixa.includes('cadastro') || perguntaBaixa.includes('cadastre')) {
        return this.respostas.cadastro;
      } else if (perguntaBaixa.includes('voluntário') || perguntaBaixa.includes('voluntario')) {
        return this.respostas.voluntario;
      } else if (perguntaBaixa.includes('denúncia') || perguntaBaixa.includes('denuncia')) {
        return this.respostas.denuncia;
      } else if (perguntaBaixa.includes('privacidade')) {
        return this.respostas.privacidade;
      } else {
        return this.respostas.padrao;
      }
    }

    escaparHTML(texto) {
      const div = document.createElement('div');
      div.textContent = texto;
      return div.innerHTML;
    }
  }

  const chatIA = new ChatIA();

  // ─────────────────────────────────────────────────────────
  // LISTA DE CONVERSAS
  // ─────────────────────────────────────────────────────────

  class ListaConversas {
    constructor() {
      this.listaConversas = document.querySelector('.lista-conversas');
      this.inputBusca = document.querySelector('.busca-input');
      this.btnNovaConversa = document.querySelector('.btn-nova-conversa');
      
      this.conversas = [
        {
          id: 1,
          nome: 'Atendimento IA',
          hora: '10:30',
          preview: 'Qual horário de funciona...',
          completa: 'Qual horário de funcionamento?'
        },
        {
          id: 2,
          nome: 'Atendimento IA',
          hora: 'Ontem',
          preview: 'Olá como posso Ajudar?',
          completa: 'Olá como posso Ajudar?'
        },
        {
          id: 3,
          nome: 'Atendimento IA',
          hora: '12/05',
          preview: 'Obrigada!',
          completa: 'Obrigada!'
        }
      ];

      this.inicializar();
    }

    inicializar() {
      if (this.inputBusca) {
        this.inputBusca.addEventListener('input', () => this.filtrarConversas());
      }

      if (this.btnNovaConversa) {
        this.btnNovaConversa.addEventListener('click', () => this.novaConversa());
      }

      this.renderizarConversas();
    }

    renderizarConversas(conversasExibir = this.conversas) {
      if (!this.listaConversas) return;

      this.listaConversas.innerHTML = '';

      conversasExibir.forEach((conversa, index) => {
        const item = document.createElement('li');
        item.className = 'conversa-item';
        if (index === 0) item.classList.add('ativo');

        item.innerHTML = `
          <div class="conversa-avatar"></div>
          <div class="conversa-info">
            <div class="conversa-cabecalho">
              <span class="conversa-nome">${conversa.nome}</span>
              <span class="conversa-hora">${conversa.hora}</span>
            </div>
            <p class="conversa-preview">${conversa.preview}</p>
          </div>
        `;

        item.addEventListener('click', () => this.selecionarConversa(conversa));
        this.listaConversas.appendChild(item);
      });
    }

    filtrarConversas() {
      const termo = this.inputBusca?.value.toLowerCase() || '';
      const filtradas = this.conversas.filter(c =>
        c.nome.toLowerCase().includes(termo) ||
        c.preview.toLowerCase().includes(termo)
      );
      this.renderizarConversas(filtradas);
    }

    selecionarConversa(conversa) {
      SOS.mostrarMensagem(`Abrindo conversa com ${conversa.nome}`, 'info');
      // Aqui você carregaria a conversa selecionada
    }

    novaConversa() {
      SOS.mostrarMensagem('Iniciando nova conversa...', 'info');
      // Aqui você criaria uma nova conversa
    }
  }

  const listaConversas = new ListaConversas();

  // ─────────────────────────────────────────────────────────
  // DÚVIDAS FREQUENTES (ACCORDION)
  // ─────────────────────────────────────────────────────────

  class DuviasFrequentes {
    constructor() {
      this.details = document.querySelectorAll('details');
      this.btnDuvida = document.querySelector('.btn-duvida');
      this.inicializar();
    }

    inicializar() {
      // Fechar outras quando uma abre
      this.details.forEach(detail => {
        detail.addEventListener('toggle', (e) => {
          if (e.target.open) {
            this.details.forEach(d => {
              if (d !== e.target) d.open = false;
            });
          }
        });
      });

      // Botão "Fale com a gente"
      if (this.btnDuvida) {
        this.btnDuvida.addEventListener('click', (e) => {
          e.preventDefault();
          SOS.mostrarMensagem('Redirecionando para WhatsApp...', 'info');
          // window.open('https://wa.me/...', '_blank');
        });
      }
    }
  }

  const duvias = new DuviasFrequentes();

  // ─────────────────────────────────────────────────────────
  // REDES SOCIAIS
  // ─────────────────────────────────────────────────────────

  const linksRedes = document.querySelectorAll('.redes-icones a');
  linksRedes.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const nomeRede = link.getAttribute('aria-label');
      SOS.mostrarMensagem(`Redirecionando para ${nomeRede}...`, 'info');
    });
  });

  console.log('✓ Bate-papo/IA inicializado');
});