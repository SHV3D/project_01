import { createGlobalStyle } from 'styled-components';
import { AppTheme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: AppTheme }>`
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    color: ${({ theme }) => theme.fg};
    background: ${({ theme }) => theme.bg};
    font-family: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    transition: background .25s ease, color .25s ease;
    padding: 22px clamp(14px, 4vw, 40px) 80px;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: #d7ff2e;
    color: #000;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes pop {
    from { opacity: 0; transform: translateY(14px) scale(.98); }
    to { opacity: 1; transform: none; }
  }

  @keyframes riseUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: none; }
  }

  /* Ant Design Modal Overrides for Dark / Custom Styling */
  .ant-modal-content {
    background: ${({ theme }) => theme.fbg} !important;
    border: 1px solid ${({ theme }) => theme.fbd} !important;
    border-radius: 18px !important;
    color: ${({ theme }) => theme.ffg} !important;
    box-shadow: 0 30px 80px rgba(0,0,0,.5) !important;
    padding: 0 !important;
    overflow: hidden;
  }

  .ant-modal-header {
    background: transparent !important;
    padding: 18px 22px !important;
    border-bottom: 1px solid ${({ theme }) => theme.fbd} !important;
    margin-bottom: 0 !important;
  }

  .ant-modal-title {
    font-family: 'Space Grotesk', sans-serif !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    color: ${({ theme }) => theme.ffg} !important;
  }

  .ant-modal-close {
    top: 16px !important;
    right: 18px !important;
    color: ${({ theme }) => theme.fmut} !important;
  }

  .ant-modal-close:hover {
    color: ${({ theme }) => theme.ffg} !important;
  }

  .ant-modal-body {
    padding: 20px 22px !important;
  }

  .ant-modal-footer {
    display: none !important;
  }
`;
