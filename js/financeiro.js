/**
 * ═══════════════════════════════════════════════════════════
 * SOSBrasil - Financeiro (Banco Digital)
 * ═══════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─────────────────────────────────────────────────────────
  // SERVIÇOS FINANCEIROS
  // ─────────────────────────────────────────────────────────

  class ServicosFinanceiros {
    constructor() {
      this.cards = document.querySelectorAll('.card-servico');
      this.inicializar();
    }

    inicializar() {
      this.cards.forEach(card => {
        card.addEventListener('click', () => this.abrirServico(card));
        card.style.cursor = 'pointer';
        card.style.transition = 'all 0.3s ease';

        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-5px)';
          card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '';
        });
      });
    }

    abrirServico(card) {
      const titulo = card.querySelector('h3').textContent;
      const descricao = card.querySelector('p').textContent;

      SOS.mostrarMensagem(`Abrindo: ${titulo}`, 'info');

      // Aqui você poderia abrir um modal ou redirecionar
      console.log(`Serviço: ${titulo}\nDescrição: ${descricao}`);

      // Simular redirecionamento após 1s
      setTimeout(() => {
        // SOS.irPara('servico-detalhes.html?servico=' + titulo);
      }, 1000);
    }
  }

  const servicosFinanceiros = new ServicosFinanceiros();

  // ─────────────────────────────────────────────────────────
  // CAROUSEL DE CARDS (se necessário)
  // ─────────────────────────────────────────────────────────

  class CarouselServicos {
    constructor() {
      this.gridServicos = document.querySelector('.grid-servicos');
      this.cards = document.querySelectorAll('.card-servico');
      this.inicializar();
    }

    inicializar() {
      // Adicionar scroll horizontal suave com setas (se necessário)
      if (this.cards.length > 6) {
        this.adicionarControlesScroll();
      }
    }

    adicionarControlesScroll() {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        position: relative;
        width: 100%;
      `;

      const btnAnterior = document.createElement('button');
      btnAnterior.textContent = '◀';
      btnAnterior.style.cssText = `
        position: absolute;
        left: -40px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        z-index: 10;
      `;

      const btnProximo = document.createElement('button');
      btnProximo.textContent = '▶';
      btnProximo.style.cssText = `
        position: absolute;
        right: -40px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        z-index: 10;
      `;

      btnAnterior.addEventListener('click', () => {
        this.gridServicos.scrollLeft -= 320;
      });

      btnProximo.addEventListener('click', () => {
        this.gridServicos.scrollLeft += 320;
      });

      // this.gridServicos.parentElement.insertBefore(wrapper, this.gridServicos);
      // wrapper.appendChild(btnAnterior);
      // wrapper.appendChild(btnProximo);
    }
  }

  const carouselServicos = new CarouselServicos();

  // ─────────────────────────────────────────────────────────
  // INFORMAÇÕES DE SEGURANÇA
  // ─────────────────────────────────────────────────────────

  console.log(`
    ═══════════════════════════════════════════════════════════
    🏦 BANCO DIGITAL SOSBRASIL
    ═══════════════════════════════════════════════════════════
    
    ✓ Transações 100% seguras
    ✓ Auditadas e certificadas
    ✓ Zero taxas em doações
    ✓ Totalmente regulamentado
    
    Serviços disponíveis:
    • Boleto
    • Cartão (Débito/Crédito)
    • PIX
    • Transferência entre Contas
    • Extrato
    • Configurações
  `);

  console.log('✓ Financeiro inicializado');
});