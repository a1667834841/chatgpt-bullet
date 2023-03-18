import { createSignal, onMount } from "solid-js";
import { Portal } from "solid-js/web";




export default function promptPopup() {

  onMount(() => {
    
  })
  return (
    <div class="prompt-popup">
        <div class="popup-content">
          <span class="close">
            &times;
          </span>
          <form>
            <input
              type="text"
              placeholder="输入内容"
            />
            <button type="submit">添加</button>
          </form>
          <ul>
         
          </ul>
          <button>更新列表</button>
        </div>
      </div>
  )
    
  

}
