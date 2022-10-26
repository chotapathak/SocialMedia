import React, {useEffect, useState} from 'react';
import {client} from "../client";
import { feedQuery, searchQuery} from "../utils/data";
import Spinner from "./Spinner";

const Search = ({searchItem}) => {
    const  [pins, setPins] = useState();
    const [loading, setLoading] = useState(false);

useEffect(() => {
    if(searchItem !== ''){
        setLoading(true);
        const query = searchQuery(searchItem.toLowerCase());
        client.fetch(query).then((data) => {
            setPins(data);
            setLoading(false);
        });
    }
}, [searchItem]);

    return (
        <div>
            {
                loading && <Spinner message={'Searching pins'}/>
            }
            {
                pins?.length === 0 && <p>Masonary Layout is needed</p>
            }
            {
                pins?.length !== 0 && searchItem !== '' && !loading && (
                    <div className={'mt10 text-center text-xl'}> No Pins Found
                    </div>
                )
            }
        </div>
    );
};

export default Search;