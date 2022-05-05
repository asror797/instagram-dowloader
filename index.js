const token = '5311073189:AAG7meA91SRjIYSObvOm5Gr9AW0QeiTHDsI'

const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(token,{polling: true})


bot.on('message',msg=>{
   const user = msg.chat.id
   const message = msg.text
   const options = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com',
         'X-RapidAPI-Key': '65a5981e76msh2f4163b0efa1df2p12ba9cjsn7de83ce964a2'
      }
   };

   if(message =='/start'){
      bot.sendMessage(user,`Salom Linkni Jo'taing`)   
   } 

   const url = message.includes('https://www.instagram.com')

   if(url) {
      bot.sendMessage(user,'<i>Loading...</i>',{
         parse_mode:'HTML'
      })
      ;(async()=>{
         try {
            let response = await fetch(`https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index?url=${message}`,options)
            response = await response.json()
            if(response.Type == 'Post-Image') {
               bot.sendPhoto(user,response.media,{
                  parse_mode:'HTML',
                  caption:'👉 Download by @MediaHorseBot'
               })
            } else if(response.Type == 'Post-Video') {
               bot.sendVideo(user,response.media,{
                  caption:'👉 Download by @MediaHorseBot'
               })
            } else {
               bot.sendMessage(user,'Nomalum buyruq')
            }
         } catch (error) {
            console.log(error)
         }
      })()
   }else{
      bot.sendMessage(user,`Iltimos link jo'nating`)
   }
})