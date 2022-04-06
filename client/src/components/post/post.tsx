
interface Props{
    title: string
    description: string
    tags: string
    imageUrl: string
}

export const Post = (props: Props) =>{
  
    console.log(props.title);
    return (
        <div className="shadow-xl rounded-lg w-60 h-72">
            <img src={props.imageUrl}  />
          <div className="flex flex-col space-y-2 p-2">
              <p>{props.tags}</p>
               <h3 className="font-bold text-lg">{props.title}</h3>
               <p className="text-sm">{props.description}</p>
          </div>
        </div>
    );
}