
import Post from '../model/post.js';

export const createPost = async (request,response) => {
    try {
        const post = await new Post(request.body);
        post.save();
        return response.status(200).json('Post saved successfully');
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const getAllPosts = async (req,res) => {
    let category = req.query.category;
    let posts;
    try{
        if(category){
            posts = await Post.find({categories: category});
        }
        else{
            posts = await Post.find({});
        }
        
        return res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).json(error)
    }
}

export const getPost = async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch ( error ) {
        return res.status(500).json({ msg: error.message });
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post) {
            return response.status(404).json({ msg: 'Post not found' })
        }
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })
        return response.status(200).json('post updated successfully');
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post) {
            return response.status(404).json({ msg: 'Post not found' })
        }
        await Post.findByIdAndDelete(post._id);
        return response.status(200).json('Post deleted successfully');
    } catch (error) {
        return response.status(500).json(error);
    }
}
