export function totalCount(total){
    if(total>1 && total<=1024){
        total = `${total.toFixed(1)} B`
    }else if(total/1024>1 && total/1024/1024<=1){
        total = `${(total/1024).toFixed(1)} KB`
    }else if(total/1024/1024>1 && total/1024/1024/1024<=1){
        total = `${(total/1024/1024).toFixed(1)} MB`
    }else{
        total = `${(total/1024/1024/1024).toFixed(1)} G`
    }
    return total
}