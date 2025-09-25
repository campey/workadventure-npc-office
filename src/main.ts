/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    // NPC Guard interactions
    WA.room.area.onEnter('npc-guard-zone').subscribe(() => {
        WA.ui.displayActionMessage({
            message: "Press SPACE to talk to the Guard",
            callback: () => {
                WA.chat.sendChatMessage("Welcome to our office, traveler!", "Guard");
                WA.chat.sendChatMessage("I'm here to help keep everyone safe.", "Guard");
                WA.chat.sendChatMessage("Feel free to explore, but mind the rules!", "Guard");
            }
        });
    });

    WA.room.area.onLeave('npc-guard-zone').subscribe(() => {
        WA.ui.removeActionMessage();
    });

    // NPC Wizard interactions
    WA.room.area.onEnter('npc-wizard-zone').subscribe(() => {
        WA.ui.displayActionMessage({
            message: "Press SPACE to talk to the Wizard",
            callback: () => {
                WA.chat.sendChatMessage("Greetings, seeker of knowledge...", "Wizard");
                WA.chat.sendChatMessage("This office holds many secrets.", "Wizard");
                WA.chat.sendChatMessage("Magic flows through the very pixels here!", "Wizard");
                WA.chat.sendChatMessage("What mysteries shall we uncover together?", "Wizard");
            }
        });
    });

    WA.room.area.onLeave('npc-wizard-zone').subscribe(() => {
        WA.ui.removeActionMessage();
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
