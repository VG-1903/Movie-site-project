


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true,
//     validate: {
//       validator: function (v) {
//         return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
//       },
//       message: props => `${props.value} is not a valid email address!`
//     }
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [8, 'Password must be at least 8 characters long'],
//     select: false
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   deletedAt: {
//     type: Date,
//     default: null
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   lastLogin: {
//     type: Date
//   }
// }, {
//   timestamps: true
// });

// // userSchema.index({ email: 1 });
// userSchema.index({ isActive: 1, deletedAt: 1 });

// userSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(12);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// userSchema.pre(/^find/, function (next) {
//   this.find({ isActive: true, deletedAt: null });
//   next();
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     const user = this.password ? this : await this.constructor.findById(this._id).select('+password');
//     return await bcrypt.compare(candidatePassword, user.password);
//   } catch (error) {
//     throw new Error('Error comparing passwords');
//   }
// };

// userSchema.methods.toSafeObject = function () {
//   const userObject = this.toObject();
//   delete userObject.password;
//   return userObject;
// };

// userSchema.methods.softDelete = async function () {
//   this.isActive = false;
//   this.deletedAt = new Date();
//   await this.save();
// };

// userSchema.methods.hardDelete = async function () {
//   await this.deleteOne();
// };

// userSchema.statics.restoreAccount = async function (email) {
//   const user = await this.findOne({ email, isActive: false }).select('+password');
//   if (!user) {
//     throw new Error('Account not found or already active');
//   }
//   user.isActive = true;
//   user.deletedAt = null;
//   await user.save();
//   return user;
// };

// const User = mongoose.model('User', userSchema);

// User.on('index', function (err) {
//   if (err) {
//     console.error('Error building indexes:', err);
//   }
// });

// module.exports = User;






















const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  deletedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

userSchema.index({ isActive: 1, deletedAt: 1 });

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre(/^find/, function (next) {
  // Only filter by isActive and deletedAt if not explicitly requesting a specific user by ID
  if (!this._conditions._id) {
    this.find({ isActive: true, deletedAt: null });
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // If password is not included in this document, we need to fetch it
    if (!this.password) {
      console.log(`Fetching password for user: ${this._id}`);
      const userWithPassword = await this.constructor.findById(this._id).select('+password');
      
      // Check if we successfully got the user with password
      if (!userWithPassword || !userWithPassword.password) {
        console.log('Password not found for user');
        return false;
      }
      
      // Compare the candidate password with the stored hash
      return await bcrypt.compare(candidatePassword, userWithPassword.password);
    }
    
    // If we already have the password field, use it directly
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false; // Return false instead of throwing for better error handling
  }
};

userSchema.methods.toSafeObject = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.methods.softDelete = async function () {
  this.isActive = false;
  this.deletedAt = new Date();
  await this.save();
};

userSchema.methods.hardDelete = async function () {
  await this.deleteOne();
};

userSchema.statics.restoreAccount = async function (email) {
  const user = await this.findOne({ email, isActive: false }).select('+password');
  if (!user) {
    throw new Error('Account not found or already active');
  }
  user.isActive = true;
  user.deletedAt = null;
  await user.save();
  return user;
};

const User = mongoose.model('User', userSchema);

User.on('index', function (err) {
  if (err) {
    console.error('Error building indexes:', err);
  }
});

module.exports = User;