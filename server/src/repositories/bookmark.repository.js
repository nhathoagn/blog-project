import connectDB from "../models/index.js";

const BookmarkModel = connectDB.bookmarks;

const BookmarkRepo = {};

BookmarkRepo.getAllBookmarks = async () => {
    return await BookmarkModel.findAll({
        include: [{
            model: connectDB.users
        }, {
            model: connectDB.posts
        }]
    });
}

BookmarkRepo.getBookmarkById = async (id) => {
    return await BookmarkModel.findOne({
        where: { id: id },
        include: [{
            model: connectDB.users
        }, {
            model: connectDB.posts
        }]
    })
}

BookmarkRepo.updateBookmark = async (id, bookmark) => {

    const bookmarkUpdate = await BookmarkModel.findOne({ where: { id: id } });

    if (!bookmarkUpdate) throw "Bookmark not found!!!";

    Object.assign(bookmarkUpdate, bookmark);

    await bookmarkUpdate.save();
}

BookmarkRepo.deleteBookmark = async (id) => {
    const bookmarkDelete = await BookmarkModel.findOne({ where: { id: id } });

    if (!bookmarkDelete) throw "Bookmark not found!!!";

    return await BookmarkModel.destroy({ where: { id: id } });
}

BookmarkRepo.createBookmark = async (bookmark) => {

    const bookmarkCreate = new BookmarkModel(bookmark);

    await bookmarkCreate.save();
}

export default BookmarkRepo;