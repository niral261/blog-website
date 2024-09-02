import Comment from '../model/comment.js';


export const newComment = async (request, response) => {
    try {
        const comment = new Comment(request.body); 
        await comment.save();
        response.status(200).json({ msg: 'Comment saved successfully.' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById( request.params.id );
        await Comment.findByIdAndDelete(comment._id);
        response.status(200).json({ msg: "comment saved successfully" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}