'use client';
import React, { useEffect, useState } from 'react';


interface ContactEntry {
    name: string;
    tel: string;
}

const ImportContacts: React.FC = () => {
    const [contacts, setContacts] = useState<ContactEntry[]>([]);
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [isSupported, setIsSupported] = useState<boolean>(false);

    const isContactApiSupported = (): boolean =>
        typeof navigator !== 'undefined' &&
        'contacts' in navigator &&
        'ContactsManager' in window;

    const isAndroidChrome = (): boolean => {
        if (typeof navigator === 'undefined') return false;
        const ua = navigator.userAgent.toLowerCase();
        return ua.includes('android') && ua.includes('chrome');
    };

    useEffect(() => {
        setIsSupported(isContactApiSupported() && isAndroidChrome());
    }, [])

    const sendContacts = async (contactsToSend: ContactEntry[]) => {
        const cleaned = contactsToSend.map(c => ({
            name: c.name.trim(),
            tel: c.tel.replace(/\s+/g, ''),
        }));

        try {
            const res = await fetch('/api/contacts/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contacts: cleaned }),
            });
            const data = await res.json();
            console.log('Imported:', data);
            alert('Contacts imported successfully!');
        } catch (error) {
            console.error('Failed to sync:', error);
            alert('Failed to sync contacts.');
        }
    };

    const getDeviceContacts = async () => {
        try {
            const props = ['name', 'tel'];
            const opts = { multiple: true };
            const picked = await (navigator as any).contacts.select(props, opts);
            console.log(picked,"cintain")
            const deviceContacts: ContactEntry[] = picked.map((c: any) => ({
                name: c.name?.[0] || '',
                tel: c.tel?.[0] || '',
            }));
            setContacts(deviceContacts);
        } catch (error) {
            console.error('Contact pick error:', error);
            alert('Could not import contacts.');
        }
    };

    const addContact = () => {
        if (!name.trim() || !tel.trim()) {
            alert('Please enter both name and phone number.');
            return;
        }
        setContacts(prev => [...prev, { name: name.trim(), tel: tel.trim() }]);
        setName('');
        setTel('');
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6 gap-5">
            <h1 className="text-2xl font-bold text-center">Import Contacts</h1>
            <img src="./images/logos/namma_chat_logo.svg" alt="Logo" className="w-24 h-24" />
            <p className="text-sm text-gray-600 text-center max-w-sm">
                You can sync your contacts and find people you know on Chat.
            </p>

            {(isSupported) && (
                <div className="w-full">
                    <button
                        className="bg-primary text-white w-full px-8 py-2 rounded-full mb-4"
                        onClick={getDeviceContacts}
                    >
                        Import Contacts
                    </button>
                    <div className="text-center text-gray-500 text-sm mb-2">OR</div>
                </div>
            )}

            <div className="w-full flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Name"
                    className="border border-gray-300 p-2 rounded"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Phone Number"
                    className="border border-gray-300 p-2 rounded"
                    value={tel}
                    maxLength={10}
                    minLength={10}
                    required
                    onChange={(e) => setTel(e.target.value.replace(/\D/g, ''))} // ensures only digits
                />
                <button
                    onClick={addContact}
                    disabled={!name || tel.length !== 10}
                    className={`bg-blue-500 text-white py-2 px-4 rounded-full transition-opacity duration-200 ${name && tel.length === 10 ? 'opacity-100' : 'opacity-50'}`}
                >
                    Add Contact
                </button>
            </div>

            <button className="mt-5 text-gray-500 text-m">Skip</button>
        </main>
    );
};

export default ImportContacts;
