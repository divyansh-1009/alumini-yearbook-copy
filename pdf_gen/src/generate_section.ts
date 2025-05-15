import {addImage,addParagraph,createDoc} from './section-content'
import {addSectionHeading} from './section-heading'

async function generateSection(templateFile:string,outputFile:string,title:string,images: string[],text: string[]){
    const fontSize=45;
    const margin=5;
    const totalPages=Math.ceil((images.length+text.length)/4);
    let currentPage=1;
    let threshold=0;
    let boxSize=[425,395];
    let location=[[0, 395], [425, 395], [0,0], [425,0]];
    function update(){
        threshold++;
                if(threshold==4){
                    if (currentPage===1){
                        boxSize=[425,425];
                        location=[[0,425],[425,425],[0,0],[425,0]];
                    }
                    threshold=0;
                    currentPage++;
                }
    }
    await createDoc(templateFile,outputFile,totalPages);
    await addSectionHeading(outputFile, outputFile, title,fontSize,margin);
    while(images.length>0 || text.length>0){
        if (images.length>0){
            const image=images.shift();
            if (image!=undefined) await addImage(outputFile,outputFile,image,location[threshold][0],location[threshold][1],boxSize[0],boxSize[1],400,300,currentPage);
            update();
        }
        
        for( let x=0; x<2; x++){
            if(text.length>0){
                const data=text.shift();
                if (data!=undefined) await addParagraph(outputFile,outputFile,data,location[threshold][0],location[threshold][1],boxSize[0],boxSize[1],300,300,12,currentPage);
                update();
            }
            
        }

        if (images.length>0){
            const image=images.shift();
            if (image!=undefined) await addImage(outputFile,outputFile,image,location[threshold][0],location[threshold][1],boxSize[0],boxSize[1],400,300,currentPage);
            update();
        }

    }
}

const image_data=["../assets/people.jpg","../assets/party.jpg","../assets/people.jpg","../assets/party.jpg","../assets/people.jpg","../assets/party.jpg","../assets/people.jpg","../assets/party.jpg","../assets/people.jpg","../assets/party.jpg","../assets/people.jpg","../assets/party.jpg"]
const text_data=[
    "A small sentence",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus tortor, sodales nec risus at, porta pretium eros. Sed sodales egestas quam. Morbi ultrices quam neque, eu efficitur nisl ullamcorper vitae. Ut ultricies sollicitudin est et mollis. Nullam sit amet feugiat massa. Curabitur euismod lectus et mi dignissim maximus. Ut sed bibendum lectus, et molestie lectus. Proin commodo ullamcorper lectus non porta. Nulla purus est, facilisis eget sollicitudin at, luctus eu massa. Sed mi erat, pellentesque quis molestie quis, congue viverra diam. Mauris et iaculis erat. Pellentesque sit amet blandit mi, ac placerat est. Donec quis lorem auctor, euismod ex.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus tortor, sodales nec risus at, porta pretium eros. Sed sodales egestas quam. Morbi ultrices quam neque, eu efficitur nisl ullamcorper vitae. Ut ultricies sollicitudin est et mollis. Nullam sit amet feugiat massa. Curabitur euismod lectus et mi dignissim maximus. Ut sed bibendum lectus, et molestie lectus. Proin commodo ullamcorper lectus non porta. Nulla purus est, facilisis eget sollicitudin at, luctus eu massa. Sed mi erat, pellentesque quis molestie quis, congue viverra diam. Mauris et iaculis erat. Pellentesque sit amet blandit mi, ac placerat est. Donec quis lorem auctor, euismod ex.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus tortor, sodales nec risus at, porta pretium eros. Sed sodales egestas quam. Morbi ultrices quam neque, eu efficitur nisl ullamcorper vitae. Ut ultricies sollicitudin est et mollis. Nullam sit amet feugiat massa. Curabitur euismod lectus et mi dignissim maximus. Ut sed bibendum lectus, et molestie lectus. Proin commodo ullamcorper lectus non porta. Nulla purus est, facilisis eget sollicitudin at, luctus eu massa. Sed mi erat, pellentesque quis molestie quis, congue viverra diam. Mauris et iaculis erat. Pellentesque sit amet blandit mi, ac placerat est. Donec quis lorem auctor, euismod ex.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus tortor, sodales nec risus at, porta pretium eros. Sed sodales egestas quam. Morbi ultrices quam neque, eu efficitur nisl ullamcorper vitae. Ut ultricies sollicitudin est et mollis. Donec quis lorem auctor, euismod ex.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus tortor, sodales nec risus at, porta pretium eros. Sed sodales egestas quam. Morbi ultrices quam neque, eu efficitur nisl ullamcorper vitae. Ut ultricies sollicitudin est et mollis. Nullam sit amet feugiat massa. Curabitur euismod lectus et mi dignissim maximus. Ut sed bibendum lectus, et molestie lectus. Proin commodo ullamcorper lectus non porta. Nulla purus est, facilisis eget sollicitudin at, luctus eu massa. Sed mi erat, pellentesque quis molestie quis, congue viverra diam. Mauris et iaculis erat. Pellentesque sit amet blandit mi, ac placerat est. Donec quis lorem auctor, euismod ex.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus tortor, sodales nec risus at, porta pretium eros. Sed sodales egestas quam. Morbi ultrices quam neque, eu efficitur nisl ullamcorper vitae. Ut ultricies sollicitudin est et mollis. Nullam sit amet feugiat massa. Curabitur euismod lectus et mi dignissim maximus. Ut sed bibendum lectus, et molestie lectus. Proin commodo ullamcorper lectus non porta. Nulla purus est, facilisis eget sollicitudin at, luctus eu massa. Sed mi erat, pellentesque quis molestie quis, congue viverra diam. Mauris et iaculis erat. Pellentesque sit amet blandit mi, ac placerat est. Donec quis lorem auctor, euismod ex.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus tortor, sodales nec risus at, porta pretium eros. Sed sodales egestas quam. Morbi ultrices quam neque, eu efficitur nisl ullamcorper vitae. Ut ultricies sollicitudin est et mollis. Nullam sit amet feugiat massa. Curabitur euismod lectus et mi dignissim maximus. Ut sed bibendum lectus, et molestie lectus. Proin commodo ullamcorper lectus non porta. Nulla purus est, facilisis eget sollicitudin at, luctus eu massa. Sed mi erat, pellentesque quis molestie quis, congue viverra diam. Mauris et iaculis erat. Pellentesque sit amet blandit mi, ac placerat est. Donec quis lorem auctor, euismod ex.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus tortor, sodales nec risus at, porta pretium eros. Sed sodales egestas quam. Morbi ultrices quam neque, eu efficitur nisl ullamcorper vitae.  Curabitur euismod lectus et mi dignissim maximus. Proin commodo ullamcorper lectus non porta. Nulla purus est, facilisis eget sollicitudin at, luctus eu massa. Sed mi erat, pellentesque quis molestie quis, congue viverra diam. Mauris et iaculis erat. Pellentesque sit amet blandit mi, ac placerat est. Donec quis lorem auctor, euismod ex."

]
const outputFile="result.pdf";
generateSection('../assets/base_bg.pdf',outputFile,'How I Met Your Mother',image_data,text_data);