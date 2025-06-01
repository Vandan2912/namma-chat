'use client';
import React from 'react';

const ImportContacts: React.FC = () => {

    const getContacts = async () => {
        const isSupported = 'contacts' in navigator && 'ContactsManager' in window;

        if (!isSupported) {
            alert('Contact import is only supported on Chrome for Android.');
            // You could also show a custom modal or redirect user
            return;
        }

        try {
            const props = ['name', 'tel']; // you can also add 'email'
            const opts = { multiple: true };
            const contacts = await (navigator as any).contacts.select(props, opts);
            console.log('Contacts:', contacts);
            // TODO: Send contacts to your server or process them
        } catch (error) {
            console.error('Error fetching contacts:', error);
            alert('Something went wrong while importing contacts.');
        }

    };
    const isContactApiSupported = () => {
        return typeof navigator !== 'undefined' &&
            'contacts' in navigator &&
            'ContactsManager' in window;
    };

    const isAndroidChrome = () => {
        const ua = navigator.userAgent.toLowerCase();
        return ua.includes('android') && ua.includes('chrome');
    };



    return (
        <main className='flex flex-col items-center justify-center h-screen bg-[white] p-4 gap-5'>
            <h1
                className="text-center font-bold"
                style={{ fontSize: '1.5rem' }}
            >
                Import Contacts
            </h1>
            <img src="./images/logos/namma_chat_logo.svg" alt="" />
            <h3 className='text-center text-[]' style={{ fontSize: '1rem' }}>Connect with friends and start chatting</h3>
            <p className='text-center font-[300] text-[14px]'>You can sync your contacts, find people you know on Chat</p>
            {(isContactApiSupported() && isAndroidChrome()) ? <div>
                <button className="bg-primary text-white w-full px-8 py-2 rounded-full mt-3 cursor-pointer" onClick={() => getContacts()}>Import Contacts</button>
                <button className='w-full w-full px-8 py-2 rounded-full mt-3' >Skip</button>
            </div> : <p className="text-m text-gray-500">
                Sorry Contact import is only available on Chrome for Android.
            </p>}
        </main>
    );
};

export default ImportContacts;