
function execute(data){
    let html = '';
    
    if( data.content && 
       data.content.children && 
       data.content.children.length>0){
      console.log("test1")
     
        let value = ''
        
        data.content.children.forEach(item=>{
  //         value = value + execute(item);
      value= value + "<" + item.tag + ">" + item.content.value + execute(item)+ "<" + item.tag + "/>";
          
          
      })
        html = html + value;
    } else {
      html= html + "<" + data.tag + ">" + data.content.value + "<" + data.tag + "/>";
      
    }
    
    
    return html; 
  }
  
  
  
  let datas = {
    "tag": "div",
    "content": {
      "value": "",
      "children": [
          {
            "tag": "div",
            "content": {
              "value": "",
              "children": [
                {
                  "tag": "span",
                  "content": {
                    "value": "test",
                    "children": []
                  }
                }
              ]
            }
          },
          {
            "tag": "ul",
            "content": {
              "value": "",
              "children": [
                {
                  "tag": "li",
                  "content": {
                    "value": "test",
                    "children": [
                      {
                        "tag": "a",
                        "content": {
                          "value": "testa",
                          "children": []
                        }
                      }
                    ]
                  }
                },
                {
                  "tag": "li",
                  "content": {
                    "value": "",
                    "children": [
                      {
                        "tag": "a",
                        "content": {
                          "value": "testa 2",
                          "children": []
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
    }
  }
  console.log("df",execute(datas))
  