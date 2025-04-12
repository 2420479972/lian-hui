import { createVNode, render } from 'vue';
import MessageComponent from './Message.vue';

interface MessageOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  content: string;
  duration?: number;
  onClose?: () => void;
}

interface MessageInstance {
  close: () => void;
}

let messageContainer: HTMLElement | null = null;
let messageCount = 0;

const createMessageContainer = () => {
  if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    messageContainer.style.cssText = `
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;
    document.body.appendChild(messageContainer);
  }
  return messageContainer;
};

const createMessage = (options: MessageOptions): MessageInstance => {
  const container = createMessageContainer();
  const id = `message-${messageCount++}`;
  
  const vnode = createVNode(MessageComponent, {
    ...options,
    id,
    onClose: () => {
      options.onClose?.();
      removeMessage(id);
    }
  });
  
  render(vnode, container);
  
  return {
    close: () => {
      removeMessage(id);
    }
  };
};

const removeMessage = (id: string) => {
  const container = createMessageContainer();
  const message = container.querySelector(`#${id}`);
  if (message) {
    message.classList.add('message-leave');
    setTimeout(() => {
      message.remove();
      if (container.children.length === 0) {
        container.remove();
        messageContainer = null;
      }
    }, 300);
  }
};

export const message = {
  success: (content: string, duration?: number) => {
    return createMessage({ type: 'success', content, duration });
  },
  error: (content: string, duration?: number) => {
    return createMessage({ type: 'error', content, duration });
  },
  warning: (content: string, duration?: number) => {
    return createMessage({ type: 'warning', content, duration });
  },
  info: (content: string, duration?: number) => {
    return createMessage({ type: 'info', content, duration });
  }
};
