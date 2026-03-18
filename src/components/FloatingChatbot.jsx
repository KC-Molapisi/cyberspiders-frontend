import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const initialMessages = [
  {
    role: 'bot',
    text: 'Hi — I can help visitors find licensing, services, about information or complaints support.',
  },
];

const intents = [
  {
    match: ['licence', 'license', 'verify'],
    text: 'For licence verification, open the Licensing section. That is the cleanest route for checking status or plugging in a real backend form later.',
    href: '/licensing',
    label: 'Go to Licensing',
  },
  {
    match: ['about', 'profile', 'career', 'careers', 'mandate'],
    text: 'The About section groups profile, mandate, leadership and careers into one place so users do not have to hunt like digital archaeologists.',
    href: '/about',
    label: 'Open About',
  },
  {
    match: ['complaint', 'contact', 'help'],
    text: 'Use the Contact and Complaints section for support pathways and forms.',
    href: '/contact',
    label: 'Open Contact',
  },
  {
    match: ['service', 'approval', 'qos'],
    text: 'The Services section brings together the public-facing service categories and can link to backend-driven detail pages later.',
    href: '/services',
    label: 'Open Services',
  },
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const latestAction = useMemo(() => messages.findLast((message) => message.href), [messages]);

  const handleSend = () => {
    const value = input.trim();
    if (!value) return;

    const lower = value.toLowerCase();
    const intent = intents.find((entry) => entry.match.some((keyword) => lower.includes(keyword)));

    const nextMessages = [
      ...messages,
      { role: 'user', text: value },
      intent
        ? { role: 'bot', text: intent.text, href: intent.href, label: intent.label }
        : {
            role: 'bot',
            text: 'I can help with licensing, services, complaints or the About section. Try a simple keyword such as licence, complaint, services or careers.',
          },
    ];

    setMessages(nextMessages);
    setInput('');
  };

  return (
    <div className="chatbot">
      {isOpen ? (
        <div className="chatbot__panel">
          <div className="chatbot__header">
            <div>
              <strong>BOCRA Site Helper</strong>
              <p>Navigation support</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              ×
            </button>
          </div>
          <div className="chatbot__messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chatbot__message chatbot__message--${message.role}`}>
                <p>{message.text}</p>
                {message.href ? <Link to={message.href}>{message.label}</Link> : null}
              </div>
            ))}
          </div>
          <div className="chatbot__composer">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleSend();
              }}
              placeholder="Ask about licences, careers, complaints..."
            />
            <button type="button" className="btn btn--primary" onClick={handleSend}>
              Send
            </button>
          </div>
          {latestAction ? (
            <div className="chatbot__quicklink">
              <Link to={latestAction.href}>{latestAction.label}</Link>
            </div>
          ) : null}
        </div>
      ) : null}

      <button type="button" className="chatbot__fab" onClick={() => setIsOpen((current) => !current)}>
        Chat
      </button>
    </div>
  );
}
