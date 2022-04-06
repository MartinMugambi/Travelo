import {gql} from 'apollo-server';


export const typeDefs = gql`

scalar Upload
 type Query{
  hello: String!
  posts: [Post!]!
  me: User!
  proifle: Profile!
 }

 type User{
    id: Int!
    username: String!
    email: String!
    password: String!
    post: [Post!]!
    profile: Profile
 }

 type Profile{
     id: Int!
     bio: String!
     imageUrl: String!
     user: User
 }

 type Post{
     id: Int!
     title: String!
     description: String!
     imageUrl:  String!
     tags: String!
     user: User!
 }

 type AuthFile{
      filename: String
  }

  type Mutation{
      signUp(input: Auth) : AuthPayLoad!
      signIn(input: Auth) : AuthPayLoad!
      postCreate(input: PostCredentials): PostPayLoad!
      singleUpload(file: Upload!): AuthFile
  }

  

 input PostCredentials{
     title: String!
     description: String!
     imageUrl: Upload!
     tags: String!
 }

 input Auth{
    username: String
    email: String!
    password: String!
  }


  type UserError{
      message: String!
  }

  type AuthPayLoad{
      userErrors: UserError
      token: String 
      user: User!
  }

  type PostPayLoad{
      userErrors: UserError
      post: Post!
  }

  
`


 