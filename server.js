const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

const app = express();
const PORT = 3000;
require('dotenv').config({ path: './res/keys.env' });
const API_KEY = process.env.API_KEY;
const VITALITY_TEAM_ID = 3455; // ID fixo da VITALITY apenas para efeitos de teste
const FURIA_TEAM_ID = 124530; // ID fixo da FURIA

app.use(cors());

app.get('/next-match', async (req, res) => {
    try {
        const response = await fetch(`https://api.pandascore.co/csgo/matches/upcoming?filter[winner_type]=Team&filter[opponent_id]=${FURIA_TEAM_ID}&token=${API_KEY}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
        res.status(500).json({ error: 'Erro ao buscar dados da PandaScore' });
    }
});

app.get('/lineup', async (req, res) => {
    try {
        const response = await fetch(`https://api.pandascore.co/csgo/teams?search[name]=Furia&sort=id&page=1&per_page=1&token=${API_KEY}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
        res.status(500).json({ error: 'Erro ao buscar dados da PandaScore' });
    }
});

app.get('/stats', async (req, res) => {
    try {
        const response = await fetch(`https://api.pandascore.co/csgo/teams?search[name]=Furia&sort=id&page=1&per_page=1&token=${API_KEY}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
        res.status(500).json({ error: 'Erro ao buscar dados da PandaScore' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});