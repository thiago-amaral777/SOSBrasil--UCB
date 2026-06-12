/**
 * ═══════════════════════════════════════════════════════════
 * SOSBrasil - Ajuda
 * ═══════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─────────────────────────────────────────────────────────
  // CARDS DE SERVIÇOS (AJUDA)
  // ─────────────────────────────────────────────────────────

  class CardsServicos {
    constructor() {
      this.cards = document.querySelectorAll('.services .card');
      this.inicializar();
    }

    inicializar() {
      this.cards.forEach(card => {
        const botao = card.querySelector('button');
        if (botao) {
          botao.addEventListener('click', () => {
            const titulo = card.querySelector('h3').textContent;
            SOS.mostrarMensagem(`Abrindo: ${titulo}`, 'info');
          });
        }
      });
    }
  }

  const cardsServicos = new CardsServicos();

  // ─────────────────────────────────────────────────────────
  // PAGINAÇÃO DE ONGs
  // ─────────────────────────────────────────────────────────

  class PaginacaoONGs {
    constructor() {
      this.gridOng = document.querySelector('.grid-ong');
      this.btnSeta = document.querySelectorAll('.btn-pag-seta');
      this.pontos = document.querySelectorAll('.ponto');
      this.paginaAtual = 0;

      this.ongs = [
        {
          nome: 'ONG de Goiás',
          descricao: 'Foco em enchentes/secas - água, alimentos e abrigos temporários.',
          valor: 30,
          imagem: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=200&fit=crop'
        },
        {
          nome: 'ONG de Minas Gerais',
          descricao: 'Especializada em deslizamentos - resgate, kits de higiene e apoio psicológico.',
          valor: 30,
          imagem: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=200&fit=crop'
        },
        {
          nome: 'ONG de Distrito Federal',
          descricao: 'O Distrito Federal ainda precisa da sua ajuda para mantimentos.',
          valor: 50,
          imagem: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=200&fit=crop'
        },
        {
          nome: 'ONG de São Paulo',
          descricao: 'Atendimento em situações de crise e vulnerabilidade social.',
          valor: 40,
          imagem: 'https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=400&h=200&fit=crop'
        }
      ];

      this.inicializar();
    }

    inicializar() {
      this.btnSeta.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          if (index === 0) this.anterior();
          else this.proximo();
        });
      });

      this.pontos.forEach((ponto, index) => {
        ponto.addEventListener('click', () => {
          this.irParaPagina(index);
        });
      });

      this.renderizar();
    }

    renderizar() {
      if (!this.gridOng) return;

      this.gridOng.innerHTML = '';

      // Exibir 3 ONGs por página
      const inicio = this.paginaAtual * 3;
      const ongsPagina = this.ongs.slice(inicio, inicio + 3);

      ongsPagina.forEach((ong, index) => {
        const card = document.createElement('div');
        card.className = 'card-ong';
        if (index === 1) card.classList.add('destaque'); // Destaque o do meio

        card.innerHTML = `
          <img src="${ong.imagem}" alt="${ong.nome}" />
          <h3>${ong.nome}</h3>
          <p>${ong.descricao}</p>
          <div class="ong-rodape">
            <button class="btn-ajudar-ong">Ajudar com R$${ong.valor},00</button>
          </div>
        `;

        // Evento do botão
        card.querySelector('.btn-ajudar-ong').addEventListener('click', () => {
          this.ajudarOng(ong);
        });

        this.gridOng.appendChild(card);
      });

      this.atualizarPontos();
    }

    proximo() {
      const maxPages = Math.ceil(this.ongs.length / 3);
      if (this.paginaAtual < maxPages - 1) {
        this.paginaAtual++;
        this.renderizar();
      }
    }

    anterior() {
      if (this.paginaAtual > 0) {
        this.paginaAtual--;
        this.renderizar();
      }
    }

    irParaPagina(index) {
      if (index < Math.ceil(this.ongs.length / 3)) {
        this.paginaAtual = index;
        this.renderizar();
      }
    }

    atualizarPontos() {
      this.pontos.forEach((ponto, index) => {
        if (index === this.paginaAtual) {
          ponto.classList.add('ativo');
        } else {
          ponto.classList.remove('ativo');
        }
      });
    }

    ajudarOng(ong) {
      SOS.salvarDados('doacao_pendente', ong);
      SOS.mostrarMensagem(`Doação de R$${ong.valor} para ${ong.nome} adicionada!`, 'sucesso');
      // Aqui você redirecionaria para a página de pagamento
      setTimeout(() => {
        SOS.irPara('financeiro.html');
      }, 1500);
    }
  }

  const paginacaoONGs = new PaginacaoONGs();

  // ─────────────────────────────────────────────────────────
  // CONTADORES DE DOAÇÃO
  // ─────────────────────────────────────────────────────────

  class ContadoresDoacoes {
    constructor() {
      this.containerCardos = document.querySelector('.grid-categorias');
      this.botoesContador = document.querySelectorAll('.btn-contador');
      this.contadores = {};

      this.inicializar();
    }

    inicializar() {
      this.botoesContador.forEach(btn => {
        btn.addEventListener('click', () => this.handleContador(btn));
      });
    }

    handleContador(btn) {
      const card = btn.closest('.card-categoria');
      const categoria = card.querySelector('.categoria-titulo').textContent;
      const valorLabel = card.querySelector('.valor-label');

      if (!this.contadores[categoria]) {
        this.contadores[categoria] = 0;
      }

      if (btn.textContent === '+') {
        this.contadores[categoria]++;
      } else {
        if (this.contadores[categoria] > 0) {
          this.contadores[categoria]--;
        }
      }

      valorLabel.textContent = `Quantidade: ${this.contadores[categoria]}`;
    }

    obterTotais() {
      return this.contadores;
    }
  }

  const contadores = new ContadoresDoacoes();

  // ─────────────────────────────────────────────────────────
  // UPLOAD DE ARQUIVOS
  // ─────────────────────────────────────────────────────────

  class UploadArquivos {
    constructor() {
      this.inputs = document.querySelectorAll('input[type="file"]');
      this.inicializar();
    }

    inicializar() {
      this.inputs.forEach(input => {
        const label = input.closest('label');
        if (label) {
          label.addEventListener('dragover', (e) => {
            e.preventDefault();
            label.style.backgroundColor = 'rgba(100, 150, 255, 0.1)';
          });

          label.addEventListener('dragleave', () => {
            label.style.backgroundColor = '';
          });

          label.addEventListener('drop', (e) => {
            e.preventDefault();
            label.style.backgroundColor = '';
            const files = e.dataTransfer.files;
            this.handleFiles(input, files);
          });

          input.addEventListener('change', (e) => {
            this.handleFiles(input, e.target.files);
          });
        }
      });
    }

    handleFiles(input, files) {
      if (files.length > 0) {
        const arquivo = files[0];
        const categoria = input.id.replace('upload-', '').charAt(0).toUpperCase() + 
                         input.id.replace('upload-', '').slice(1);
        
        SOS.mostrarMensagem(`Arquivo "${arquivo.name}" adicionado a ${categoria}!`, 'sucesso');
        
        // Salvar informação do arquivo
        const label = input.closest('label');
        label.querySelector('span:last-of-type').textContent = arquivo.name;
      }
    }
  }

  const uploads = new UploadArquivos();

  // ─────────────────────────────────────────────────────────
  // FINALIZAR DOAÇÃO
  // ─────────────────────────────────────────────────────────

  const btnFinalizarDoacao = document.querySelector('.btn-doar');
  if (btnFinalizarDoacao) {
    btnFinalizarDoacao.addEventListener('click', () => {
      const totais = contadores.obterTotais();
      const totalItens = Object.values(totais).reduce((a, b) => a + b, 0);

      if (totalItens === 0) {
        SOS.mostrarMensagem('Selecione pelo menos um item para doar', 'erro');
        return;
      }

      const resumo = Object.entries(totais)
        .filter(([, qty]) => qty > 0)
        .map(([cat, qty]) => `${qty}x ${cat}`)
        .join(', ');

      const dados = {
        doacoes: totais,
        total_itens: totalItens,
        resumo: resumo,
        data: new Date().toISOString()
      };

      SOS.salvarDados('doacao_separada', dados);
      SOS.mostrarMensagem(`Doação de ${resumo} confirmada!`, 'sucesso');

      // Redirecionar
      setTimeout(() => {
        SOS.irPara('financeiro.html');
      }, 1500);
    });
  }

  console.log('✓ Ajuda inicializado');
});