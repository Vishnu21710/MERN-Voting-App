import React, {useState} from 'react'
import { useGetCandidatesQuery, useRegisterVoteMutation } from '../store/slices/apiSlice'
import { useNavigate } from 'react-router-dom'

const Vote = () => {

  const { data: candidates, isLoading, isError, error } = useGetCandidatesQuery()
  const navigate = useNavigate()

  const [id, setid] = useState('')
  
  const [registerVote, {isLoading:voteLoding, isError: isVoteError ,error: voteError}] = useRegisterVoteMutation()

  const vote  = async(e)=>{
    e.preventDefault()
    console.log('inside vote');
    console.log(id);
    try {
      const voteRes = await registerVote(id).unwrap()
      console.log('Voteres',voteRes);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={vote}  className="overflow-x-auto w-4/6 mx-auto">
      <h1 className='text-4xl font-bold text-gray-800 mb-10'>Select a candidate to Vote</h1>
      {
        isLoading ? <span className="loading loading-spinner loading-lg"></span> :isError ? 'Candidates and Admins cannot vote': (
          <table className="table border-2 p-5 ">
            {/* head */}

            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Email</th>


              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                candidates.map((candidate) => (
                  <tr key={candidate._id}>
                    <th>
                      <label>
                        <input type="radio" className='radio' name='radio' onChange={(e) => e.target.checked && setid(candidate?._id)} />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{candidate?.name}</div>
                          <div className="text-sm opacity-50">{candidate?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {candidate.email}
                    </td>

                  </tr>

                ))
              }


            </tbody>


          </table>
        )
      }
    <button type='submit'  className='btn btn-primary mt-5'>Vote</button>
    </form>
  )
}

export default Vote