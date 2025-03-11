"use client"
import React, { useState } from 'react'

export default function EditUser({ user, handleEdit }) {
    const [edit, setEdit] = useState(false);

  return (
    <div className="form-container w-3/4 flex flex-col gap-3 m-auto">
        <p><strong>{user.nombre}</strong>&apos;s Profile</p>
        <form action={handleEdit} className="mx-auto flex flex-col text-black gap-3 w-full justify-center">
        <div className="flex gap-3 w-full">
            <div className="flex flex-col gap-3 w-full">
                <label htmlFor="name" className='text-white'>Name: </label>
                <input className="px-3 py-2 rounded-lg text-2xl" type="text" name="name" id="name" defaultValue={user.nombre}  disabled={!edit}/>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <label htmlFor="lastname" className='text-white'>Last Name: </label>
                <input className="px-3 py-2 rounded-lg text-2xl" type="text" name="lastname" id="lastname" defaultValue={user.apellido} disabled={!edit}/>
            </div>
        </div>
        <div className="flex gap-3 w-full">
            <div className="flex flex-col gap-3 w-full">
                <label htmlFor="username" className='text-white'>Username: </label>
                <input className="px-3 py-2 rounded-lg text-2xl" type="text" name="username" id="username" defaultValue={user.usuario1} disabled={!edit}/>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <label htmlFor="email" className='text-white'>Email: </label>
                <input className="px-3 py-2 rounded-lg text-2xl" type="email" name="email" id="email" defaultValue={user.email} autoComplete="email" onChange={() => setEdit(true)} disabled={!edit}/>
            </div>
        </div>
        <div className="flex gap-3 w-full mb-3">
            <div className="flex flex-col gap-3 w-full">
                <label htmlFor="password" className='text-white'>Password:</label>
                <input className="px-3 py-2 rounded-lg text-2xl" type="password" name="password" id="password" placeholder="New password" autoComplete="password" onChange={() => setEdit(true)}/>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <label htmlFor="new-password" className='text-white'>Confirm password:</label>
                <input className="px-3 py-2 rounded-lg text-2xl" type="password" name="repeatPassword" id="repeatPassword" placeholder="Repeat new password" autoComplete="new-password" onChange={() => setEdit(true)}/>
            </div>
        </div>
        <p className={`text-red-500 ${edit ? 'opacity-100' : 'opacity-0'}`}><strong>WARNING</strong>: If you update your user data, your session will be closed, no problem, you&apos;ll can log in again later.</p>
        {edit ? 
            <div className="row flex flex-col gap-3">
                
                <div className="row flex gap-3">
                    <button className="bg-green-500 text-white p-3 rounded-lg text-2xl" type='submit'>Confirm</button>
                    <button onClick={() => setEdit(false)} className="bg-red-500 text-white p-3 rounded-lg text-2xl">Cancel</button>
                </div>
            </div>
        : ""}
        </form>
        {!edit ? 
            <div className="edit-mode w-full flex justify-start">
                <button className="bg-orange-500 text-white p-3 rounded-lg text-2xl" onClick={() => setEdit(true)}>Edit</button>
            </div>
        : ""}
        
    </div>
  )
}
