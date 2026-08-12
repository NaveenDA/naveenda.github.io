import { useState } from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScQv_B3gExz5WDEa2E3VCC3JcAU2aRDnXiTZtWmHb_b8Qi-0A/formResponse';
        const url = `${formUrl}?&submit=Submit&entry.2005620554=${formData.name}&entry.1045781291=${formData.email}&entry.1065046570=${formData.message}`;
        window.open(url, '_blank');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm flex items-center justify-center z-50 px-4" onClick={onClose}>
            <div
                className="bg-card border border-ink w-full max-w-md p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink mb-2">
                            Get in touch
                        </p>
                        <h2 className="font-display text-2xl text-foreground">Say hello</h2>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1.5">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="block w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-gold-ink transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="block w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-gold-ink transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1.5">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                            className="block w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-gold-ink transition-colors resize-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gold text-ink font-semibold py-2.5 border border-ink shadow-hard-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                    >
                        Send message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;
