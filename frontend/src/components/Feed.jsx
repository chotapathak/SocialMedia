import React from 'react';
import {useParams} from "react-router-dom";

import {client} from "../client";
import {feedQuery, searchQuery} from "../utils/data";
import Spinner from "./Spinner";

const Feed = () => {
    const [pins, setPins] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const {categoryId} = useParams();

    React.useEffect(() => {
        if (categoryId) {
            setLoading(true);
            const query = searchQuery(categoryId);
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false);
            })
    } else {
        setLoading(true);
        client.fetch(feedQuery).then((data) => {
            setPins(data);
            setLoading(false);
        })
    }
        } , [categoryId]);

    const ideaName = categoryId || 'new' ;
    if (loading) {
        return (
            <Spinner message={`We are adding ${ideaName} ideas to your feed`}/>
        );
    }
    return (
        <div>
            { pins && (
                    <div>Layout pins</div>
                )
            }
        </div>
    );
};

export default Feed;