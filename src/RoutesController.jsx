import React , {useEffect , useState} from 'react'
import {Redirect} from 'react-router-dom'

const RoutesController = props =>{
    const { component : Component  , isAuthentificated , ...rest} = props

    const [ isAuth , setIsAuth] = useState(true)

    const init = () => {
        if(!localStorage.getItem('auth')){
            setIsAuth(false)
        } else {
            const auth = JSON.parse(localStorage.getItem('auth'))
            if(auth){
                setIsAuth(true)
            }else{
                setIsAuth(false)
            }
        }
    }
    useEffect(init , [])
    return isAuth ? <Component {...rest} /> : <Redirect to='/login' />
}
