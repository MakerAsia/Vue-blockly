# vue-blockly
vue.js blockly integration - *this not directly compile from original blockly source
### compile
- npm install
- gulp build

all output in dist folder.

### vue component
```javascript
<template>
        <div id="blocklyDiv" style="position:fixed; width:100%; height:95%;">
            </div>
            <xml id="toolbox" ref=toolbox style="display: none"> 
                <category name='Basic' icon="./static/icons/SVG/c1.svg">
                    <block type="controls_if"></block> 
                    <block type="text"></block>
                    <block type="text_print"></block>
                </category>
            </xml>
</template>

<script> 
import Blockly from 'vue-blockly';
import en from 'vue-blockly/dist/msg/en'
export default {
    name: 'editor',
    components: { },  
    data(){
     return {
       workspace: null,
       toolbox: null,
     }
   },
   mounted(){
        //set lang
		Blockly.Msg = Object.assign(en, Blockly.Msg);
        Blockly.Msg = Blockly.Msg();
        Blockly.utils.getMessageArray_ = function () {
            return Blockly.Msg
        }
		//init workspace
        this.toolbox = document.getElementById('toolbox');
        this.workspace = Blockly.inject('blocklyDiv', {
            grid: {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true
		    },
		    media: './static/blockly/media/',
		    toolbox: this.toolbox,
		    zoom: {
                controls: true,
                wheel: true,
                startScale: 1,
                maxScale: 2,
                minScale: 0.3,
                scaleSpeed: 1.2
		    }
        });

        this.workspace.addChangeListener(this.updatecode);
        console.log('blocly mounted');        
    },
    methods:{
        updatecode(){
            console.log(Blockly.JavaScript.workspaceToCode(this.workspace));
        }
    }
}
</script>
```

### License
MIT