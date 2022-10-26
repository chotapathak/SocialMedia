import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

import { categories } from '../utils/data';
import { client } from '../client';
// import { Spinner } from './Spinner';
import {Spinner} from '../components/Spinner'

const CreatePin = ({user}) => {
    const [title, setTitle] = React.useState('');
    const [about, setAbout] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [destination, setDestination] = React.useState('');
    const [fields, setFields] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [imageAsset, setImageAsset] = React.useState('');
    const [wrongImageType, setWrongImageType] = React.useState(false);

    const navigate = useNavigate();

    const uploadImage = (e) => {
        const selectedFile = e.target.files[0];
        // uploading asset to sanity
        if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
            setWrongImageType(false);
            setLoading(true);
            client.assets
                .upload('image', selectedFile, {contentType: selectedFile.type, filename: selectedFile.name})
                .then((document) => {
                    setImageAsset(document);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('upload failed: ', error.message)
                });
        } else {
            setLoading(false);
            setWrongImageType(true);
        }
    };

    const savePin = () => {
        if (title && about && destination && imageAsset?._id && category ){
            const doc = {
                _type: 'pin',
                title,
                about,
                destination,
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset._id,
                    },
                },
                userId: user._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user._id,
                },
                category,
            };
            client.create(doc).then(() => {
                navigate('/')
            });
        } else {
            setFields(true);

            setTimeout(() => {
                setFields(false);
            },
                2000,
            );
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
            {fields && (
                <p className={'text-red-500 text-center text-base 2xl:text-lg'}>Please fill all the fields</p>
            )}
            <div className={'flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full'}>
                <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
                    <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                        {loading && (
                            // <Spinner />
                            <h1>loading</h1>
                        )}
                        {wrongImageType && (
                            <p>It&apos;s wrong file type.</p>
                        )}
                        {!imageAsset ? (
                            <label>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-bold text-2xl">
                                            <AiOutlineCloudUpload />
                                        </p>
                                        <p className="text-lg">Click to upload</p>
                                    </div>

                                    <p className="mt-32 text-gray-400">
                                        Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    name="upload-image"
                                    onChange={uploadImage}
                                    className="w-0 h-0"
                                />
                            </label>
                            ) : (
                            <div className="relative h-full">
                                <img
                                    src={imageAsset?.url}
                                    alt="uploaded-pic"
                                    className="h-full w-full"
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                    onClick={() => setImageAsset(null)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}
            </div>
        </div>
                <div className="flex flex-col flex-1 gap-6 lg:pl-5 mt-5 w-full">
                    <input
                    type={'text'}
                    placeholder={'Add your title'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={'border-2 border-gray-300 p-3 w-full outline-none'}
                    />
                    {user && (
                        <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
                            <img
                                src={user.image}
                                className="w-10 h-10 rounded-full"
                                alt="user-profile"
                            />
                            <p className="font-bold">{user.userName}</p>
                        </div>
                    )}
                    <input
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Tell everyone what your Pin is about"
                        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
                    />
                    <input
                        type="url"
                        vlaue={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Add a destination link"
                        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
                    />

                    <div className="flex flex-col">
                        <div>
                            <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Pin Category</p>
                            <select
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                            >
                                <option value="others" className="sm:text-bg bg-white">Select Category</option>
                                {categories.map((item) => (
                                    <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end items-end mt-5">
                            <button
                                type="button"
                                onClick={savePin}
                                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                            >
                                Save Pin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePin;