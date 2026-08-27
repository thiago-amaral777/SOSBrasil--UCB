/**
 * ═══════════════════════════════════════════════════════════
 * SOSBrasil - JavaScript Global
 * ═══════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────
// UTILIDADES GERAIS
// ─────────────────────────────────────────────────────────

const SOS = {
  // Validações
  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  validarSenha(senha) {
    return senha.length >= 6;
  },

  validarIdade(idade) {
    return idade >= 13 && idade <= 120;
  },

  // Storage (simulado, pode ser integrado com backend depois)
  salvarDados(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (e) {
      console.error('Erro ao salvar dados:', e);
      return false;
    }
  },

  obterDados(chave) {
    try {
      const dados = localStorage.getItem(chave);
      return dados ? JSON.parse(dados) : null;
    } catch (e) {
      console.error('Erro ao obter dados:', e);
      return null;
    }
  },

  removerDados(chave) {
    try {
      localStorage.removeItem(chave);
      return true;
    } catch (e) {
      console.error('Erro ao remover dados:', e);
      return false;
    }
  },

  // Notificações
  mostrarMensagem(texto, tipo = 'info') {
    const div = document.createElement('div');
    div.className = `notificacao notificacao-${tipo}`;
    div.textContent = texto;
    div.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background-color: ${tipo === 'sucesso' ? '#10b981' : tipo === 'erro' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      z-index: 10000;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(div);
    
    setTimeout(() => {
      div.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => div.remove(), 300);
    }, 3000);
  },

  // Navegação
  irPara(url) {
    window.location.href = url;
  },

  // Formato de moeda
  formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  },

  // Formato de data
  formatarData(data) {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(data));
  }
};

// ─────────────────────────────────────────────────────────
// INICIALIZAÇÃO GLOBAL
// ─────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Ativar ícones Lucide se disponível
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Log de inicialização
  console.log('✓ SOSBrasil carregado com sucesso!');
});

// ─────────────────────────────────────────────────────────
// ANIMAÇÕES CSS GLOBAIS
// ─────────────────────────────────────────────────────────

const estilo = document.createElement('style');
estilo.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(400px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(400px);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .notificacao {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
document.head.appendChild(estilo);