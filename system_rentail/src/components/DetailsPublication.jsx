import * as React from 'react';
import '../styles/details_publication.sass'
import SimpleBackdrop from './SimpleBackdrop'
import CardDetails from './CardDetails'
import BasicBreadcrumbs from './BasicBreadcrumbs'

export default function DetailsPublication(props) {

    const [ publication, setPublication] = React.useState([])
    const [ loading, setLoading ] = React.useState(null)
    const [ search, setSearch ] = React.useState(null)

    React.useEffect(() => {
        const getPublication = async (url) => {
            setLoading(true)
            const request = await fetch(url)
            if (request.status === 200) {
              const jsonRequest = await request.json()
                  setLoading(false)
                  setPublication(jsonRequest)
                  setSearch(jsonRequest[0].title)
          } else {
              setLoading(false)
              setPublication([])
          }
        }

        let { id } = props.match.params    
        getPublication('https://income-system.herokuapp.com/publications/' + id)
    
    },[])

    return (
        <>
        {loading ? <SimpleBackdrop loading={true} />: null}
        <BasicBreadcrumbs search={search} />
        <div className="details-publication">
            {publication.length > 0 ? <CardDetails publication={publication}/> : null}
        </div>
        </>
    )
}