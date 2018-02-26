export const formatQs = (q) => {
    if(!q) {
        return '';
    }
    let qs = '';
    Object.keys(q).map( k => {
        if( k === 'sort' ) {
            q[k].forEach(item => {
                qs += `${qs.length > 0 ? '&' : ''}sort=${item}`;
            });
        } else if( k === 'dir' ) {
            q[k].forEach( (item, index) => {
                qs += `${qs.length > 0 ? '&' : ''}${q.sort[index]}.dir=${item}`;    
            });
        } else {
            if(q[k] !== undefined) {
                qs += `${qs.length > 0 ? '&' : ''}${k}=${q[k]}`;
            }
        }
        return null;
    });
    return `${qs.length > 0 ? '?' : ''}${qs}`;
};