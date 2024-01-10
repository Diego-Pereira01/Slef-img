const fs = require("fs");
const chai = require('chai');
const path = require("path");
const chalk = require('chalk');
const mocha = require('mocha');
const botcall = require('../json/botcall.json');
const figlet = require('figlet');
const { joinVoiceChannel } = require('@discordjs/voice');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { Client, Intents, MessageManager } = require("discord.js-selfbot-v13");

module.exports = {
    fs,
    path,
    chai,
    chalk,
    fetch,
    botcall,
    mocha,
    figlet,
    Client,
    Intents,
    MessageManager,
    joinVoiceChannel,
};