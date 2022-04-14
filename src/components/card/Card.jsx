import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getContributors, getCurrentRepo } from '../actions/repos';
import './card.less'

function Card(props) {

  const navigate = useNavigate();
  const {username, reponame} = useParams();
  
  const [repo, setRepo] = useState( {owner: {}} );
  const [contributors, setContributors] = useState([]);
  
  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo)
    getContributors(username, reponame, setContributors)
  }, [])

  return (
    <div className='maincard'>
    
      <div className="card">
        <img className='avatar' src={repo.owner.avatar_url} alt=''/>
        <div className="name">Название репозитория: {repo.name}</div>
        <div className="stars">Количество звезд: {repo.stargazers_count}</div>
      </div>

      {contributors.length > 0 ? contributors.map((contr, index) => <div key={contr.id}>{index+1}. {contr.login}</div>) : 'нет контр'}

      <button onClick={() => navigate('/')} className="back-btn">Back</button>
    </div>
  );
}

export default Card;
