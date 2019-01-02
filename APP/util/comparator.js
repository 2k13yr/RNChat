
/*
    该工具类作用于contacts页面，在初始化时对好友列表中的姓名和键值
    进行排序
*/
const pinyin = require('pinyin');
function comparator(array){
    let sections = [
       { key:'A',data:[] },   
       { key:'B',data:[] },
       { key:'C',data:[] },
       { key:'D',data:[] },
       { key:'E',data:[] },
       { key:'F',data:[] },
       { key:'G',data:[] },
       { key:'H',data:[] },
       { key:'I',data:[] },
       { key:'J',data:[] },
       { key:'K',data:[] },
       { key:'L',data:[] },
       { key:'M',data:[] },
       { key:'N',data:[] },
       { key:'O',data:[] },
       { key:'P',data:[] },
       { key:'Q',data:[] },
       { key:'R',data:[] },
       { key:'S',data:[] },
       { key:'T',data:[] },
       { key:'U',data:[] },
       { key:'V',data:[] },
       { key:'W',data:[] },
       { key:'X',data:[] },
       { key:'Y',data:[] },
       { key:'Z',data:[] },
    ]
    array.forEach(element => {
        let result = pinyin(element,{style:pinyin.STYLE_FIRST_LETTER})
        let r = result[0][0].substring(0,1);     
        if(r=='a'||r=='A') sections[0].data.push(element)
        if(r=='b'||r=='B') sections[1].data.push(element)
        if(r=='c'||r=='C') sections[2].data.push(element)
        if(r=='d'||r=='D') sections[3].data.push(element)
        if(r=='e'||r=='E') sections[4].data.push(element)
        if(r=='f'||r=='F') sections[5].data.push(element)
        if(r=='g'||r=='G') sections[6].data.push(element)
        if(r=='h'||r=='H') sections[7].data.push(element)
        if(r=='i'||r=='I') sections[8].data.push(element)
        if(r=='j'||r=='J') sections[9].data.push(element)
        if(r=='k'||r=='K') sections[10].data.push(element)
        if(r=='l'||r=='L') sections[11].data.push(element)
        if(r=='m'||r=='M') sections[12].data.push(element)
        if(r=='n'||r=='N') sections[13].data.push(element)
        if(r=='o'||r=='O') sections[14].data.push(element)
        if(r=='p'||r=='P') sections[15].data.push(element)
        if(r=='q'||r=='Q') sections[16].data.push(element)
        if(r=='r'||r=='R') sections[17].data.push(element)
        if(r=='s'||r=='S') sections[18].data.push(element)
        if(r=='t'||r=='T') sections[19].data.push(element)
        if(r=='u'||r=='U') sections[20].data.push(element)
        if(r=='v'||r=='V') sections[21].data.push(element)
        if(r=='w'||r=='W') sections[22].data.push(element)
        if(r=='x'||r=='X') sections[23].data.push(element)
        if(r=='y'||r=='Y') sections[24].data.push(element)
        if(r=='z'||r=='Z') sections[25].data.push(element)
        
        })
        let out = []
        sections.forEach(element=>{
            if(element.data.length){
                out.push(element)
            }
        })
        return out;
}

module.exports = comparator;


