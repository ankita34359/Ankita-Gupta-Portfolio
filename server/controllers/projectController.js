const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('❌ Error in getProjects:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
    try {
        const projectData = { ...req.body };

        if (req.file) {
            projectData.image = req.file.path;
        }

        if (projectData.tech && typeof projectData.tech === 'string') {
            projectData.tech = projectData.tech.split(',').map(s => s.trim());
        }

        if (projectData.achievements && typeof projectData.achievements === 'string') {
            projectData.achievements = projectData.achievements.split('\n').map(s => s.trim()).filter(s => s !== '');
        }

        if (typeof projectData.isFeatured === 'string') {
            projectData.isFeatured = projectData.isFeatured === 'true';
        }

        const project = await Project.create(projectData);
        res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('❌ Error in createProject:', error);
        if (req.file) console.log('DEBUG: File received (error):', req.file);
        res.status(400).json({ success: false, message: error.message || 'Error creating project' });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        const projectData = { ...req.body };

        if (req.file) {
            projectData.image = req.file.path;
        }

        if (projectData.tech && typeof projectData.tech === 'string') {
            projectData.tech = projectData.tech.split(',').map(s => s.trim());
        }

        if (projectData.achievements && typeof projectData.achievements === 'string') {
            projectData.achievements = projectData.achievements.split('\n').map(s => s.trim()).filter(s => s !== '');
        }

        if (typeof projectData.isFeatured === 'string') {
            projectData.isFeatured = projectData.isFeatured === 'true';
        }

        project = await Project.findByIdAndUpdate(req.params.id, projectData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('❌ Error in updateProject:', error);
        if (req.file) console.log('DEBUG: File received:', req.file);
        res.status(400).json({ success: false, message: error.message || 'Error updating project' });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        await project.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error('Error in deleteProject:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};
