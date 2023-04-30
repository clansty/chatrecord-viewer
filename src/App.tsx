import {useEffect, useState} from 'react'
import styles from './styles/Home.module.css'
import DateGroup from './types/DateGroup'
import DateContainer from './components/DateContainer'
import processHistory from './utils/processHistory'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api'

function App() {
    const [data, setData] = useState<DateGroup[] | undefined>(undefined)
    const [error, setError] = useState(false)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        let fetchUrl = ''
        if (params.get('res') && params.get('sign')) {
            fetchUrl = `${BASE_URL}/records${window.location.search}`
        }
        else if (params.get('hash')) {
            fetchUrl = `/api/get/${params.get('hash')}`
        }
        if (!fetchUrl) {
            setError(true)
        }
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => setData(processHistory(data as any)))
            .catch(e => setError(e))
    }, [])

    if (error) {
        console.log(error)
        return <div>Error</div>
    }

    if (!data)
        return <div>Loading...</div>

    return (
        <div className={styles.container}>
            <div className={styles.container}>
                {data.map(e => <DateContainer group={e} key={e.date}/>)}
            </div>
        </div>
    )
}

export default App
