(function(window) {
    'use strict';

    var config = {
        projectUrl: 'https://aksxwbktytovuvdacypp.supabase.co',
        publishableKey: 'sb_publishable_0JyLbiRWGdDoUKtSxcACSg__j-fp_DN'
    };
    var client = null;

    function isConfigured() {
        return Boolean(config.projectUrl.trim() && config.publishableKey.trim());
    }

    function getClient() {
        if (!isConfigured()) {
            throw new Error('Supabase browser configuration is missing.');
        }

        if (!window.supabase || typeof window.supabase.createClient !== 'function') {
            throw new Error('The Supabase browser client did not load.');
        }

        if (!client) {
            client = window.supabase.createClient(config.projectUrl, config.publishableKey, {
                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                    detectSessionInUrl: false
                }
            });
        }

        return client;
    }

    window.fs5Supabase = {
        config: config,
        getClient: getClient,
        isConfigured: isConfigured
    };
})(window);
