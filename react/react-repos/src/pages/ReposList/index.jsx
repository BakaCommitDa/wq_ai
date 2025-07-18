import { 
  useParams,
  useNavigate,
  Link
} from 'react-router-dom'
import {
  useEffect
} from 'react'
import {
  useRepos
} from '@/hooks/useRepos';

const RepoList = () => {
    const {id} = useParams();
    console.log(useParams());
    const navigate = useNavigate();
    // hooks  
    const { repos, loading, error } = useRepos(id);
    console.log(repos, loading, error)
    useEffect(() => {
      if(!id.trim()) {
        navigate('/')
      }
    }, [])
    if(loading)return(<>Lodaing...</>);

    if(error)return(<>Error:{error}</>)

   
    return (
        <>
          <h2>Repositories for {id}</h2>
          {
            repos.map((repo)=>(
                <div key={repo.id}>
                    <Link to={`/users/${id}/repos/${repo.name}`}>
                    {repo.name}    
                    </Link>
                </div>
            ))
          } 
        </>
    )
}

export default RepoList