let conversationText = "Test";
let conversationNext;
function showConversationFragment(app, text) {
  playSound(5);
  gState = 10;
  conversationApp = app;
  conversationText = text;
  return new Promise (resolve => {
    conversationNext = resolve;
  });
}

async function showConversation(app, conv) {
  for (let i = 0; i < conv.length; i++) {
    await showConversationFragment(app, conv[i]);
  }
}
