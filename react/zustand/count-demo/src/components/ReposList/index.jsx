import { useRepoStore } from "../../store/repos";
import { useEffect } from 'react'

const RepoList = () =>{
    const {
        repos,
        loading,
        error,
        fetchRepos
    } = useRepoStore();
    useEffect(()=>{
        fetchRepos();
    },[])
    if(loading)return <p>loading...</p>
    if(error)return <p>error:{error}</p>
    
    return(
        <div>
            <h2>RepoList</h2>
            <ul>
                {
                    repos.map(repo=>(
                        <li key={repo.id}>
                            <a href={repo.html_url} target='_blank' rel='noreferrer'>{repo.name}</a>
                            <p>{repo.description || 'No description'}</p>
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}
export default RepoList;
