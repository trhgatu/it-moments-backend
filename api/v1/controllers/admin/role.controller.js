import Role from "../../models/role.model.js";
const controller = {

    /* [GET] api/v1/admin/roles */
    index: async (req, res) => {
        try {
            const records = await Role.find({ deleted: false });
            res.status(200).json({
                success: true,
                message: "Danh sách nhóm quyền",
                records
            });
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Có lỗi xảy ra khi lấy danh sách nhóm quyền",
                error: error.message
            });
        }
    },
    createPost: async (req, res) => {
        try {
            const role = new Role(req.body);
            const savedRole = await role.save();

            return res.status(201).json({
                success: true,
                message: 'Nhóm quyền đã được tạo thành công',
                data: savedRole,
            });
        } catch(error) {
            return res.status(400).json({
                success: false,
                message: 'Có lỗi xảy ra khi tạo nhóm quyền',
                error: error.message,
            });
        }

    },
    permissions: async (req, res) => {
        try {
            const find = {
                deleted: false
            }
            const records = await Role.find(find);
            res.status(200).json({
                success: true,
                message: "Phân quyền",
                records
            });

        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Có lỗi xảy ra khi lấy danh sách nhóm quyền",
                error: error.message
            });
        }
    },
    permissionsPatch: async (req, res) => {
        try {
            const permissions = JSON.parse(req.body.permissions);
            const updatePromises = permissions.map(async (item) => {
                return await Role.updateOne(
                    { _id: item.id },
                    { permissions: item.permissions }
                );
            });

            await Promise.all(updatePromises);

            return res.status(200).json({
                success: true,
                message: 'Cập nhật quyền thành công',
            });
        } catch(error) {
            console.error('Lỗi khi cập nhật quyền:', error);
            return res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra khi cập nhật quyền',
                error: error.message,
            });
        }
    }





}
export default controller;