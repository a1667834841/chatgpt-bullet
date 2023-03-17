let player: AudioBufferSourceNode;

/**
 * 输出声音
 * @param text 文字
 */
export function exportVoice(text:string) {
    let myHeaders = new Headers();
    myHeaders.append("Format", "audio-16khz-32kbitrate-mono-mp3");
    myHeaders.append("Content-Type", "text/plain");
    
    var raw = "<speak xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"http://www.w3.org/2001/mstts\" xmlns:emo=\"http://www.w3.org/2009/10/emotionml\" version=\"1.0\" xml:lang=\"en-US\">          <voice name=\"zh-CN-XiaoxiaoNeural\">          <lang xml:lang=\"zh-CN\">\n            <mstts:express-as style=\"general\" styledegree=\"1.0\" role=\"default\">              <prosody rate=\"0%\" pitch=\"0%\">                  "+text+"              </prosody >            </mstts:express-as>\n            </lang>\n          </voice >        </speak >";
    
    let ctx = new AudioContext();
    fetch("https://voice.toolkit.show/api/azure", {
        method: 'POST',
        headers: myHeaders,
        body: raw
     })
     .then(response => {
        if (response.status === 200) {
            return response.arrayBuffer()
        } else {
            return response.text().then(text => Promise.reject(text));
        }
    })
       .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
            .then(audio => {
                player = ctx.createBufferSource();
                player.buffer = audio;
                player.connect(ctx.destination);
                player.start(ctx.currentTime);
            })
            .catch(reason => {
                alert(reason);
            })
       .catch(error => console.log('error', error));
}

export  function stopVoice() {
    player.stop();
}


